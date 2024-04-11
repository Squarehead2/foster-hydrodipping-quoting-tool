import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "../../_utils/firebase";
import { SHA256 } from "crypto-js";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaLetters, setCaptchaLetters] = useState([]);
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [unsubscribeChecked, setUnsubscribeChecked] = useState(false);
  const navigate = useNavigate(); // Access to the navigate function
  const fonts = [
    "cursive",
    "fantasy",
    "monospace",
    "sans-serif",
    "serif",
    "system-ui",
  ];

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomText = Math.random().toString(36).substr(2, 6); // Generate a random string
    const captchaLetters = randomText.split("").map((letter) => ({
      value: letter,
      rotation: generateRandomRotation(),
      font: generateRandomFont(),
    }));
    setCaptchaLetters(captchaLetters);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const enteredCaptchaText = captchaLetters
      .map((letter) => letter.value)
      .join("");
    if (enteredCaptcha !== enteredCaptchaText) {
      alert("Please enter the correct captcha text");
      return;
    }
    if (!privacyPolicyChecked) {
      alert("Please accept the privacy policy");
      return;
    }
    if (unsubscribeChecked) {
      console.log("User has opted out of the newsletter");
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        SHA256(password).toString()
      );
      console.log("User registered successfully");
      sendEmailVerification(auth.currentUser); // Sends Email Verification to the user
      document.getElementById("my_modal_verify").showModal(); // Show the modal
      signOut(auth); // Sign out the user after registration
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };

  console.log(auth.currentUser);

  const handleCaptchaInputChange = (e) => {
    setEnteredCaptcha(e.target.value);
  };

  const generateRandomRotation = () => {
    return Math.floor(Math.random() * 21) - 10; // Generate a random rotation between -10 and 10 degrees
  };

  const generateRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)]; // Randomly select a font from the available fonts
  };

  const handlePrivacyPolicy = (e) => {
    setPrivacyPolicyChecked(e.target.checked);
  };

  const handleUnsubscribe = (e) => {
    setUnsubscribeChecked(e.target.checked);
  };

  return (
    <>
      <div className="container max-w-md mx-auto absolute bg-white p-16 text-center rounded-3xl flex justify-center items-center ">
        <div className="form-container bg-white rounded-lg p-10 shadow-md max-w-md w-full">
          <h2 className="text-3xl text-primary-200 mb-5 font-bold">Register</h2>
          <form>
            <div className="input-container mb-5">
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-envelope text-xl mx ml-1"></i>
            </div>
            <div className="input-container mb-5">
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-solid fa-lock text-xl ml-1"></i>
            </div>
            <div className="captcha">
              <label htmlFor="captcha"></label>
              <div
                className="preview-captcha w-full text-center h-10 tracking-widest border"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {captchaLetters.map((letter, index) => (
                  <span
                    key={index}
                    style={{
                      transform: `rotate(${letter.rotation}deg)`,
                      fontFamily: letter.font,
                    }}
                  >
                    {letter.value}
                  </span>
                ))}
              </div>
              <div className="input-container mb-5">
                <input
                  type="text"
                  id="captcha-input"
                  className="input input-bordered w-full max-w-xs text-white"
                  placeholder="Enter Captcha text"
                  onChange={handleCaptchaInputChange}
                />
                <button
                  className="hover:bg-primary-400 text-white bg-primary-300 rounded-xl mt-2"
                  onClick={generateCaptcha}
                >
                  <i className="fa-solid fa-refresh"></i>
                </button>
              </div>
            </div>
            {/* Div for Unsubscribe & Privacy Policy */}
            <div className="flex flex-row">
              {/* Checkbox for Unsubscribe */}
              <div className="p-2 text-sm">
                <label>
                  <input type="checkbox" onChange={handleUnsubscribe} />
                </label>
                <p className="text-black">Unsubscribe to our newsletter</p>
              </div>
              {/* Checkbox for privacy policy */}
              <div className="p-2 text-sm">
                <input type="checkbox" onChange={handlePrivacyPolicy} />
                <p className="text-black">
                  I accept the{" "}
                  <span
                    className="underline hover:font-bold "
                    onClick={() =>
                      document
                        .getElementById("my_modal_privacyPolicy")
                        .showModal()
                    }
                  >
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
            <button
              className="btn w-full hover:bg-primary-400 text-white bg-primary-300 "
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="text-center text-black">
              Already Have an account? /{" "}
              <Link to="/login" className="font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <>
        <dialog id="my_modal_verify" className="modal">
          <div className="modal-box bg-white">
            <h2>Please Verify Your Email</h2>
            <p>
              We have sent you an email to verify your account. Please verify
              your account to continue and generate quotes.
            </p>
            <div>
              <form
                method="dialog"
                className="flex w-full space-x-3 flex-row-reverse border-3 border-solid border-purple-100"
              >
                <button>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
      <>
        <dialog id="my_modal_privacyPolicy" className="modal">
          <div className="modal-box bg-white text-xs">
              <h1 className="font-bold">Privacy Policy</h1>
              <p>Last updated: April 11, 2024</p><br />
              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You.
              </p><br />
              <p>
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy. This Privacy
                Policy has been created with the help of the{" "}
                <a
                  href="https://www.privacypolicies.com/privacy-policy-generator/"
                  target="_blank"
                  className="font-bold hover:underline"
                >
                  Privacy Policy Generator
                </a>
                .
              </p><br />
              <h2 className="font-bold">Interpretation and Definitions</h2>
              <h3 className="font-bold indent-2">Interpretation</h3>
              <p>
                The words of which the initial letter is capitalized have meanings
                defined under the following conditions. The following definitions
                shall have the same meaning regardless of whether they appear in
                singular or in plural.
              </p><br />
        
              <h3 className="font-bold indent-2">Definitions</h3>
              <p>For the purposes of this Privacy Policy:</p><br />
              <ul>
                <li>
                  <p>
                    <strong>Account</strong> means a unique account created for
                    You to access our Service or parts of our Service.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Affiliate</strong> means an entity that controls, is
                    controlled by or is under common control with a party, where
                    &quot;control&quot; means ownership of 50% or more of the
                    shares, equity interest or other securities entitled to vote
                    for election of directors or other managing authority.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Company</strong> (referred to as either &quot;the
                    Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                    &quot;Our&quot; in this Agreement) refers to Foster Hydro
                    Dipping, 24170 Meadow Dr, Calgary, AB T3R 1A8.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Cookies</strong> are small files that are placed on
                    Your computer, mobile device or any other device by a website,
                    containing the details of Your browsing history on that
                    website among its many uses.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Country</strong> refers to: Alberta, Canada
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Device</strong> means any device that can access the
                    Service such as a computer, a cellphone or a digital tablet.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Personal Data</strong> is any information that relates
                    to an identified or identifiable individual.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Service</strong> refers to the Website.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Service Provider</strong> means any natural or legal
                    person who processes the data on behalf of the Company. It
                    refers to third-party companies or individuals employed by the
                    Company to facilitate the Service, to provide the Service on
                    behalf of the Company, to perform services related to the
                    Service or to assist the Company in analyzing how the Service
                    is used.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Third-party Social Media Service</strong> refers to
                    any website or any social network website through which a User
                    can log in or create an account to use the Service.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Usage Data</strong> refers to data collected
                    automatically, either generated by the use of the Service or
                    from the Service infrastructure itself (for example, the
                    duration of a page visit).
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Website</strong> refers to Foster Hydro Dipping,
                    accessible from{" "}
                    <a
                      href="https://fosterhydrodipping.com/"
                      rel="external nofollow noopener"
                      target="_blank"
                      className="font-bold hover:underline"
                    >
                      https://fosterhydrodipping.com/
                    </a>
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>You</strong> means the individual accessing or using
                    the Service, or the company, or other legal entity on behalf
                    of which such individual is accessing or using the Service, as
                    applicable.
                  </p>
                </li><br />
              </ul>

              <h2 className="font-bold">Collecting and Using Your Personal Data</h2>
              <h3 className="font-bold indent-2">Types of Data Collected</h3><br />

              <h4 className="font-bold indent-3">Personal Data</h4>
              <p>
                While using Our Service, We may ask You to provide Us with certain
                personally identifiable information that can be used to contact or
                identify You. Personally identifiable information may include, but
                is not limited to:
              </p>
              <ul>
                <li>
                  <p>Email address</p>
                </li>
                <li>
                  <p>First name and last name</p>
                </li>
                <li>
                  <p>Usage Data</p>
                </li>
              </ul><br />

              <h4 className="font-bold indent-3">Usage Data</h4>
              <p>Usage Data is collected automatically when using the Service.</p>
              <p>
                Usage Data may include information such as Your Device's Internet
                Protocol address (e.g. IP address), browser type, browser version,
                the pages of our Service that You visit, the time and date of Your
                visit, the time spent on those pages, unique device identifiers
                and other diagnostic data.
              </p>
              <p>
                When You access the Service by or through a mobile device, We may
                collect certain information automatically, including, but not
                limited to, the type of mobile device You use, Your mobile device
                unique ID, the IP address of Your mobile device, Your mobile
                operating system, the type of mobile Internet browser You use,
                unique device identifiers and other diagnostic data.
              </p>
              <p>
                We may also collect information that Your browser sends whenever
                You visit our Service or when You access the Service by or through
                a mobile device.
              </p><br />

              <h4 className="font-bold indent-3">Information from Third-Party Social Media Services</h4>
              <p>
                The Company allows You to create an account and log in to use the
                Service through the following Third-party Social Media Services:
              </p>
              <ul>
                <li className="font-bold indent-6">Google</li>
              </ul>
              <p>
                If You decide to register through or otherwise grant us access to
                a Third-Party Social Media Service, We may collect Personal data
                that is already associated with Your Third-Party Social Media
                Service's account, such as Your name, Your email address, Your
                activities or Your contact list associated with that account.
              </p>
              <p>
                You may also have the option of sharing additional information
                with the Company through Your Third-Party Social Media Service's
                account. If You choose to provide such information and Personal
                Data, during registration or otherwise, You are giving the Company
                permission to use, share, and store it in a manner consistent with
                this Privacy Policy.
              </p><br />

              <h4 className="font-bold indent-3">Tracking Technologies and Cookies</h4>
              <p>
                We use Cookies and similar tracking technologies to track the
                activity on Our Service and store certain information. Tracking
                technologies used are beacons, tags, and scripts to collect and
                track information and to improve and analyze Our Service. The
                technologies We use may include:
              </p><br />
              <ul>
                <li>
                  <strong>Cookies or Browser Cookies.</strong> A cookie is a small
                  file placed on Your Device. You can instruct Your browser to
                  refuse all Cookies or to indicate when a Cookie is being sent.
                  However, if You do not accept Cookies, You may not be able to
                  use some parts of our Service. Unless you have adjusted Your
                  browser setting so that it will refuse Cookies, our Service may
                  use Cookies.
                </li><br />
                <li>
                  <strong>Web Beacons.</strong> Certain sections of our Service
                  and our emails may contain small electronic files known as web
                  beacons (also referred to as clear gifs, pixel tags, and
                  single-pixel gifs) that permit the Company, for example, to
                  count users who have visited those pages or opened an email and
                  for other related website statistics (for example, recording the
                  popularity of a certain section and verifying system and server
                  integrity).
                </li><br />
              </ul>
              <p>
                Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                Cookies. Persistent Cookies remain on Your personal computer or
                mobile device when You go offline, while Session Cookies are
                deleted as soon as You close Your web browser. Learn more about
                cookies on the{" "}
                <a
                  href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                  target="_blank"
                >
                  Privacy Policies website
                </a>{" "}
                article.
              </p>
              <p>
                We use both Session and Persistent Cookies for the purposes set
                out below:
              </p><br />
              <ul>
                <li>
                  <p>
                    <strong>Necessary / Essential Cookies</strong>
                  </p>
                  <p>Type: Session Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies are essential to provide You with
                    services available through the Website and to enable You to
                    use some of its features. They help to authenticate users and
                    prevent fraudulent use of user accounts. Without these
                    Cookies, the services that You have asked for cannot be
                    provided, and We only use these Cookies to provide You with
                    those services.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Cookies Policy / Notice Acceptance Cookies</strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies identify if users have accepted the use
                    of cookies on the Website.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>Functionality Cookies</strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p>
                    Purpose: These Cookies allow us to remember choices You make
                    when You use the Website, such as remembering your login
                    details or language preference. The purpose of these Cookies
                    is to provide You with a more personal experience and to avoid
                    You having to re-enter your preferences every time You use the
                    Website.
                  </p>
                </li><br />
              </ul>
              <p>
                For more information about the cookies we use and your choices
                regarding cookies, please visit our Cookies Policy or the Cookies
                section of our Privacy Policy.
              </p><br />

              <h3 className="font-bold indent-2">Use of Your Personal Data</h3>
              <p>The Company may use Personal Data for the following purposes:</p><br />
              <ul>
                <li>
                  <p>
                    <strong>To provide and maintain our Service</strong>,
                    including to monitor the usage of our Service.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>To manage Your Account:</strong> to manage Your
                    registration as a user of the Service. The Personal Data You
                    provide can give You access to different functionalities of
                    the Service that are available to You as a registered user.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>For the performance of a contract:</strong> the
                    development, compliance and undertaking of the purchase
                    contract for the products, items or services You have
                    purchased or of any other contract with Us through the
                    Service.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>To contact You:</strong> To contact You by email,
                    telephone calls, SMS, or other equivalent forms of electronic
                    communication, such as a mobile application's push
                    notifications regarding updates or informative communications
                    related to the functionalities, products or contracted
                    services, including the security updates, when necessary or
                    reasonable for their implementation.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>To provide You</strong> with news, special offers and
                    general information about other goods, services and events
                    which we offer that are similar to those that you have already
                    purchased or enquired about unless You have opted not to
                    receive such information.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>To manage Your requests:</strong> To attend and manage
                    Your requests to Us.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>For business transfers:</strong> We may use Your
                    information to evaluate or conduct a merger, divestiture,
                    restructuring, reorganization, dissolution, or other sale or
                    transfer of some or all of Our assets, whether as a going
                    concern or as part of bankruptcy, liquidation, or similar
                    proceeding, in which Personal Data held by Us about our
                    Service users is among the assets transferred.
                  </p>
                </li><br />
                <li>
                  <p>
                    <strong>For other purposes</strong>: We may use Your
                    information for other purposes, such as data analysis,
                    identifying usage trends, determining the effectiveness of our
                    promotional campaigns and to evaluate and improve our Service,
                    products, services, marketing and your experience.
                  </p>
                </li><br />
              </ul>
              <p>
                We may share Your personal information in the following
                situations:
              </p><br />
              <ul>
                <li>
                  <strong>With Service Providers:</strong> We may share Your
                  personal information with Service Providers to monitor and
                  analyze the use of our Service, to contact You.
                </li><br />
                <li>
                  <strong>For business transfers:</strong> We may share or
                  transfer Your personal information in connection with, or during
                  negotiations of, any merger, sale of Company assets, financing,
                  or acquisition of all or a portion of Our business to another
                  company.
                </li><br />
                <li>
                  <strong>With Affiliates:</strong> We may share Your information
                  with Our affiliates, in which case we will require those
                  affiliates to honor this Privacy Policy. Affiliates include Our
                  parent company and any other subsidiaries, joint venture
                  partners or other companies that We control or that are under
                  common control with Us.
                </li><br />
                <li>
                  <strong>With business partners:</strong> We may share Your
                  information with Our business partners to offer You certain
                  products, services or promotions.
                </li><br />
                <li>
                  <strong>With other users:</strong> when You share personal
                  information or otherwise interact in the public areas with other
                  users, such information may be viewed by all users and may be
                  publicly distributed outside. If You interact with other users
                  or register through a Third-Party Social Media Service, Your
                  contacts on the Third-Party Social Media Service may see Your
                  name, profile, pictures and description of Your activity.
                  Similarly, other users will be able to view descriptions of Your
                  activity, communicate with You and view Your profile.
                </li><br />
                <li>
                  <strong>With Your consent</strong>: We may disclose Your
                  personal information for any other purpose with Your consent.
                </li><br />
              </ul>

              <h3 className="font-bold indent-2">Retention of Your Personal Data</h3>
              <p>
                The Company will retain Your Personal Data only for as long as is
                necessary for the purposes set out in this Privacy Policy. We will
                retain and use Your Personal Data to the extent necessary to
                comply with our legal obligations (for example, if we are required
                to retain your data to comply with applicable laws), resolve
                disputes, and enforce our legal agreements and policies.
              </p>
              <p>
                The Company will also retain Usage Data for internal analysis
                purposes. Usage Data is generally retained for a shorter period of
                time, except when this data is used to strengthen the security or
                to improve the functionality of Our Service, or We are legally
                obligated to retain this data for longer time periods.
              </p><br />

              <h3 className="font-bold indent-2">Transfer of Your Personal Data</h3>
              <p>
                Your information, including Personal Data, is processed at the
                Company's operating offices and in any other places where the
                parties involved in the processing are located. It means that this
                information may be transferred to — and maintained on — computers
                located outside of Your state, province, country or other
                governmental jurisdiction where the data protection laws may
                differ than those from Your jurisdiction.
              </p>
              <p>
                Your consent to this Privacy Policy followed by Your submission of
                such information represents Your agreement to that transfer.
              </p>
              <p>
                The Company will take all steps reasonably necessary to ensure
                that Your data is treated securely and in accordance with this
                Privacy Policy and no transfer of Your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of Your data and other
                personal information.
              </p><br />

              <h3 className="font-bold indent-2">Delete Your Personal Data</h3>
              <p>
                You have the right to delete or request that We assist in deleting
                the Personal Data that We have collected about You.
              </p>
              <p>
                Our Service may give You the ability to delete certain information
                about You from within the Service.
              </p>
              <p>
                You may update, amend, or delete Your information at any time by
                signing in to Your Account, if you have one, and visiting the
                account settings section that allows you to manage Your personal
                information. You may also contact Us to request access to,
                correct, or delete any personal information that You have provided
                to Us.
              </p>
              <p>
                Please note, however, that We may need to retain certain
                information when we have a legal obligation or lawful basis to do
                so.
              </p><br />

              <h3 className="font-bold indent-2">Disclosure of Your Personal Data</h3>
              <h4 className="font-bold indent-3">Business Transactions</h4>
              <p>
                If the Company is involved in a merger, acquisition or asset sale,
                Your Personal Data may be transferred. We will provide notice
                before Your Personal Data is transferred and becomes subject to a
                different Privacy Policy.
              </p><br />

              <h4 className="font-bold indent-3">Law enforcement</h4>
              <p>
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court or
                a government agency).
              </p><br />

              <h4 className="font-bold indent-3">Other legal requirements</h4>
              <p>
                The Company may disclose Your Personal Data in the good faith
                belief that such action is necessary to:
              </p><br />
              <ul>
                <li>Comply with a legal obligation</li><br />
                <li>Protect and defend the rights or property of the Company</li><br />
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </li><br />
                <li>
                  Protect the personal safety of Users of the Service or the
                  public
                </li><br />
                <li>Protect against legal liability</li><br />
              </ul>

              <h3 className="font-bold indent-2">Security of Your Personal Data</h3>
              <p>
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially acceptable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </p><br />

              <h2 className="font-bold indent-2">Children's Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 13. We do not
                knowingly collect personally identifiable information from anyone
                under the age of 13. If You are a parent or guardian and You are
                aware that Your child has provided Us with Personal Data, please
                contact Us. If We become aware that We have collected Personal
                Data from anyone under the age of 13 without verification of
                parental consent, We take steps to remove that information from
                Our servers.
              </p>
              <p>
                If We need to rely on consent as a legal basis for processing Your
                information and Your country requires consent from a parent, We
                may require Your parent's consent before We collect and use that
                information.
              </p><br />

              <h2 className="font-bold indent-2">Links to Other Websites</h2>
              <p>
                Our Service may contain links to other websites that are not
                operated by Us. If You click on a third party link, You will be
                directed to that third party's site. We strongly advise You to
                review the Privacy Policy of every site You visit.
              </p>
              <p>
                We have no control over and assume no responsibility for the
                content, privacy policies or practices of any third party sites or
                services.
              </p><br />

              <h2 className="font-bold indent-2">Changes to this Privacy Policy</h2>
              <p>
                We may update Our Privacy Policy from time to time. We will notify
                You of any changes by posting the new Privacy Policy on this page.
              </p>
              <p>
                We will let You know via email and/or a prominent notice on Our
                Service, prior to the change becoming effective and update the
                &quot;Last updated&quot; date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any
                changes. Changes to this Privacy Policy are effective when they
                are posted on this page.
              </p><br />

              <h2 className="font-bold indent2">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <ul>
                <li>
                  <p>By email: info@fosterhydrodipping.com</p>
                </li>
                <li>
                  <p>
                    By visiting this page on our website:{" "}
                    <a
                      href="https://fosterhydrodipping.com/#contact"
                      rel="external nofollow noopener"
                      target="_blank"
                      className="font-bold hover:underline"
                    >
                      https://fosterhydrodipping.com/#contact
                    </a>
                  </p>
                </li><br />
              </ul>
            <div>
              <form method="dialog">
                <button className="btn hover:bg-primary-200">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    </>
  );
};

export default Register;
