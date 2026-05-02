export type User = {
  id: string;
  email: string;
  username: string;
  postalCode: string;
  adverts: any[]; // TODO: change from any[] to Advert[] once Advert is defined
  favorites: any[]; // TODO: change from any[] to Favorite[] once Favorite is defined
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
};
