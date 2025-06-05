import { Message } from "@/model/user";


export interface ApiResponse{
  sucess: boolean;
  message: string;
  isAccesptingMessages?: boolean;
  messages?: Message[];
}
