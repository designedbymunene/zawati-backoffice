import { format, parse } from "date-fns";

export const splitDateAndTime = (inputDate: string) => {
  const date = parse(inputDate, "yyyy-MM-dd HH:mm:ss", new Date());

  const formattedDate = format(date, "yyyy-MM-dd");
  const formattedTime = format(date, "h:mm a");

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export function generateUniqueDigits(): string {
  let uniqueDigits = "";

  while (uniqueDigits.length < 4) {
    let randomDigit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)

    if (!uniqueDigits.includes(randomDigit.toString())) {
      uniqueDigits += randomDigit; // Add the unique digit to the string
    }
  }

  return uniqueDigits;
}

export function textToSlug(inputText: string): string {
  const words = inputText.toLowerCase().split(" "); // Convert to lowercase and split into words
  const slug = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase(); // Extract first letters, join them, and convert to uppercase
  return slug;
}

export function getCurrentDateTimeString() {
  const currentDateTime = new Date(); // Create a new Date object for the current date and time
  const formattedDateTime = format(currentDateTime, "yyyy-MM-dd HH:mm:ss"); // Format the date and time
  return formattedDateTime;
}

export const thousandSeparator = (number: number): string => {
  return number.toLocaleString("en-US");
};
