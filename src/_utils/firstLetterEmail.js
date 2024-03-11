function getFirstLetterOfEmail(email) {
  if (!email) {
    return "";
  }
  return email.charAt(0).toUpperCase();
}

export default getFirstLetterOfEmail;
