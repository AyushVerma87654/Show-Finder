type show = {
  id: number;
  name: string;
  type: string;
  summary: string;
  genres: string[];
  rating: {
    average: number;
  };
  weight: number;
  image: {
    medium: string;
    original: string;
  };
};

export default show;
