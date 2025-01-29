import React, { useState } from 'react';

const PasswordStrengthChecker = ({ value }) => {
  const [passwordStrength] = useState(getPasswordStrength(value));

  return (
    <div className="password-strength-container">
      <div className="password-strength-meter" style={{ width: `${passwordStrength.progress}%` }}>
        {/* Progress bar */}
      </div>
      <div className="password-strength-info">
        <h3>{passwordStrength.level}</h3>
        <p>{passwordStrength.message}</p>
      </div>
    </div>
  );
};

function getPasswordStrength(password) {
  let score = 0;
  let level = 'Weak';
  let message;

  // Criteria for password strength
  const criteria = [
    { regex: /[A-Z]/, name: 'Uppercase letter' },
    { regex: /\d/, name: 'Number' },
    { regex: /[^A-Za-z0-9]/, name: 'Special character' },
  ];

  // Base score for length
  if (password.length >= 8) {
    score += 2;
  } else if (password.length >= 5) {
    score += 1;
  }

  // Check additional criteria
  criteria.forEach(criteriaItem => {
    if (criteriaItem.regex.test(password)) {
      score++;
    }
  });

  // Determine strength level and message based on score
  let progress = Math.round((score / 5) * 100); // Max score is 5

  switch (true) {
    case score >= 4:
      level = 'Strong';
      message = 'Very strong password!';
      break;
    case score >= 3:
      level = 'Medium';
      message = 'Moderately strong password.';
      break;
    case score >= 2:
      level = 'Fair';
      message = 'Could be stronger. Add more criteria.';
      break;
    default:
      level = 'Weak';
      message = 'Very weak password. Add more criteria.';
      break;
  }

  return {
    score,
    level,
    progress,
    message,
  };
}

export default PasswordStrengthChecker;