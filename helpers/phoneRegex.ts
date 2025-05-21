export function formatSerbianPhone(input: string): string {
    
    const digits = input.replace(/\D/g, '');

    let userInput = '';
    if (digits.startsWith("381")) {
        userInput = digits.slice(3);
    } else if (digits.startsWith("0")) {
        userInput = digits.slice(1);
    } else {
        userInput = digits;
    }

    userInput = userInput.slice(0, 9);

    const area = userInput.slice(0, 2);
    const rest = userInput.slice(2);
    let formatted = "+381";
    if (area) formatted += ` ${area}`;
    if (rest) formatted += ` ${rest}`;

    return formatted;
}
