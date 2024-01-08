export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  role?: string;
  number?: string;
  address?: {
    fullName?: string;
    companyName?: string;
    country?: string;
    state?: string;
    address?: string;
    city?: string;
    zipCode?: string;
  };

  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

export interface Service {
  _id: string;
  name: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: {
    label: string;
    value: string;
  }[];
  images?: string[];
  priceList: {
    type: string;
    name: string;
    price: string;
    about: string;
    revisions: string;
    delivery: string;
  }[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  categories: {
    label: string;
    value: string;
  }[];
  technologies: {
    label: string;
    value: string;
  }[];
  thumbnail: string;
  images?: string[];
  github?: string;
  link?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  serviceCat: {
    label: string;
    value: string;
  };
  avatar: string;
}

export interface Skill {
  _id: string;
  position: string;
  company: string;
  companyLink: string;
  technologies: {
    label: string;
    value: string;
  }[];
  startDate: string;
  endDate: string;
  workingNow: boolean;
  description: string;
  image: string;
}

export interface Faq {
  id: string;
  title: string;
  content: string;
}

export interface Order {
  _id: String;
  projectName: String;
  serviceId: String;
  service: String;
  orderDetails: Object;
  extras: Object[];
  userId: String;
  user: User;
  totalPrice: Number;
  status: String;
  paymentInfo: {
    id: String;
    status: String;
    type: String;
  };
  paidAt: Date;
  deliveredAt: Date;
  createdAt: Date;
}

export interface ContactUs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  help: string;
  serviceIntrest: string;
  message: string;
}
