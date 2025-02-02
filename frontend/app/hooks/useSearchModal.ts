import {create} from "zustand";
import {format} from "date-fns";


export type SearchQuery = {
  country: string | undefined;
  checkIn: Date|undefined;
  checkOut: Date|undefined;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  category: string|undefined;
}

interface SearchModalStore{
  isOpen:boolean;
  step:string;
  open: (step:string)=>void;
  close: ()=>void;
  query: SearchQuery;
  setQuery: (query:SearchQuery)=>void;
  getQueryString: () => string;
}

const useSearchModal = create<SearchModalStore>((set,get) => ({
  isOpen:false,
  open:(step)=>set({isOpen:true,step:step }),
  step:'',
  close:()=>set({isOpen:false}),
  setQuery:(query:SearchQuery) => set({query:query}),
  query:  {
    country:'',
    checkIn: undefined,
    checkOut: undefined,
    guests:1,
    bedrooms:1,
    bathrooms:1,
    category: ''
  },
  getQueryString: () => {
    const query = get().query;
    const params = new URLSearchParams();

    if (query.country) params.append('country', query.country);
    if (query.checkIn) params.append('checkin_date', format(query.checkIn,"yyyy-MM-dd"));
    if (query.checkOut) params.append('checkout_date', format(query.checkOut,"yyyy-MM-dd"));
    if (query.guests) params.append('guests', query.guests.toString());
    if (query.bathrooms) params.append('bathrooms', query.bathrooms.toString());
    if (query.bedrooms) params.append('bedrooms', query.bedrooms.toString());
    if (query.category) params.append('category', query.category);

    console.log("PARAMS:  ",params.toString())
    console.log("CATEGORY:  ",query.category)
    return params.toString();
  }
}));

export default useSearchModal;