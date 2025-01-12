

interface PasswordStrengthIndicatorProps {
  password: string;
  errors: string[];
}

export function PasswordStrengthIndicator({ password, errors }: PasswordStrengthIndicatorProps) {
  const getStrengthPercentage = () => {
    if (password.length === 0) return 0;
    const maxErrors = 5; // Total number of possible validation rules
    const strengthPercentage = ((maxErrors - errors.length) / maxErrors) * 100;
    return Math.max(5, strengthPercentage); // Minimum 5% for visual feedback
  };

  const getStrengthColor = () => {
    const strength = getStrengthPercentage();
    if (strength < 30) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${getStrengthPercentage()}%` }}
        />
      </div>
      {errors.length > 0 && (
        <ul className="text-sm text-red-600 space-y-1">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}