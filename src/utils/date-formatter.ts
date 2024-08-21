import dayjs from 'dayjs';
 
export const formatDateTime = (
  dateTimeString: string,
): string => {
  const date = dayjs(dateTimeString);

  const formattedDate = date.format("DD/MM/YYYY");

  return `${formattedDate}`;
};
