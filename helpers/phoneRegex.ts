export function formatSerbianPhone(input: string): string {
    // Strip all non-digit characters
    const digits = input.replace(/\D/g, '');

    // Remove '381' or '0' if present
    let userInput = '';
    if (digits.startsWith("381")) {
        userInput = digits.slice(3);
    } else if (digits.startsWith("0")) {
        userInput = digits.slice(1);
    } else {
        userInput = digits;
    }

    // Limit to 7 digits max
    userInput = userInput.slice(0, 7);

    // Format output
    const area = userInput.slice(0, 2);
    const rest = userInput.slice(2);
    let formatted = "+381";
    if (area) formatted += ` ${area}`;
    if (rest) formatted += ` ${rest}`;

    return formatted;
}
