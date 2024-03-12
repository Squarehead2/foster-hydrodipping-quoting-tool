import React, { Component } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
      errorMessage: "",
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.props.onChange(value); // Call the onChange prop with the new value
    this.validate(value);
  };

  validate = (value) => {
    const { required, minLength, pattern, customValidation } = this.props;

    if (required && value.trim() === "") {
      this.setState({
        isValid: false,
        errorMessage: "This field is required.",
      });
      return;
    }

    if (minLength && value.length < minLength) {
      this.setState({
        isValid: false,
        errorMessage: `Minimum length is ${minLength} characters.`,
      });
      return;
    }

    if (pattern && !pattern.test(value)) {
      this.setState({
        isValid: false,
        errorMessage: "Invalid format.",
      });
      return;
    }

    if (customValidation && !customValidation(value)) {
      this.setState({
        isValid: false,
        errorMessage: "Custom validation failed.",
      });
      return;
    }

    this.setState({
      isValid: true,
      errorMessage: "",
    });
  };

  render() {
    const { label, type, placeholder, style, value } = this.props; // Get value from props instead of state
    const { isValid, errorMessage } = this.state;

    return (
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          type={type}
          value={value} // Use value from props
          onChange={this.handleChange}
          className={`shadow appearance-none border border-gray-300 rounded-lg w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            !isValid ? "border-red-500" : ""
          } focus:bg-gray-100`}
          style={style}
        />
        {!isValid && (
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        )}
      </div>
    );
  }
}

// Add prop type validation
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool, // Add validation for 'required' prop
  minLength: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  customValidation: PropTypes.func,
  value: PropTypes.string.isRequired, // Add validation for 'value' prop
  onChange: PropTypes.func.isRequired, // Add validation for 'onChange' prop
};

export default InputField;
