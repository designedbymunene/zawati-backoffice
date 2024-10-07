import { format, parse, parseISO } from "date-fns";

export const splitDateAndTime = (inputDate: string) => {
  try {
    // Attempt to parse the input date
    const date = parse(inputDate, "yyyy-MM-dd HH:mm:ss", new Date());

    // Check if the parsed date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Format the date and time
    const formattedDate = format(date, "yyyy-MM-dd");
    const formattedTime = format(date, "h:mm a");

    return {
      date: formattedDate,
      time: formattedTime,
    };
  } catch (error: any) {
    console.error("Error splitting date and time:", error.message);
    return {
      date: null,
      time: null,
    };
  }
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

export const formatTime = (dateString: string | null): string => {
  // Check for null or empty string
  if (!dateString) {
    return "";
  }

  try {
    // Parse the date string
    const date = parseISO(dateString);

    // Format the date to AM/PM format
    return format(date, "hh:mm a");
  } catch (error) {
    console.error("Error parsing date:", error);
    return "";
  }
};

export const formatFriendlyDate = (dateString: string | null): string => {
  // Check for null or empty string
  if (!dateString) {
    return "";
  }

  try {
    // Parse the date string
    const date = parseISO(dateString);

    // Format the date to a human-friendly format
    return format(date, "MMMM d, yyyy, h:mm a");
  } catch (error) {
    console.error("Error parsing date:", error);
    return "";
  }
};
