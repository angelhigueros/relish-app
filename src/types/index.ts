export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Album {
  id: number;
  title: string;
  user: User;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: Album;
}

export interface PhotoFilters {
  id?: number;
  title?: string;
  'album.title'?: string;
  'album.user.email'?: string;
  limit?: number;
  offset?: number;
}

export interface ApiResponse {
  data: Photo[];
  total: number;
  offset: number;
  limit: number;
}