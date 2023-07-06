import moment from "moment";

export const formatMoment = (timestamp: string) => {
  return moment(timestamp).format("h:mm A");
};
