import {Document, Expression} from "mongoose";
import {NextFunction, Request, Response} from "express";
import DateToString = module

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            PORT: number;
            DB_URL: string;
            SERVER_KEY: string;
        }
    }
}


declare interface UserProfile {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role?: role;
    createdAt: string;
}
declare interface LoginDetails {
    identifier: string ; // name | phone | email
    password: string;
}
declare  interface AuthResponse {
    profile: UserProfile;
    token: string;
    message: string;
}
declare interface SignupDetails extends LoginDetails, UserProfile {
    confirmPassword: string;
    identifier?: undefined;
}

declare interface MemberModel extends Document, UserProfile {
    password: string;
    verified: boolean;
}
declare interface LoanHistory {
    amount: number;
    date: string;
}
declare interface LoanModel extends Document {
    userId: string;
    principal: number;
    value: number;
    deadline: Date;
    interest: number; // is percentage
    penaltyRate: number; // is percentage
    paid: boolean;
    approved: boolean;
    pending: boolean;
    defaulted: boolean;
    history: LoanHistory[]
    createdAt: Date
}

declare interface ShareHistory {
    amount: number;
    date: Date;
    mode: 'debit'|'credit'
}
declare interface ShareModel extends Document {
    member: MemberModel;
    realValue: Number;
    history: ShareHistory[];
}
declare interface ChamaModel extends Document {
    name: string;
    interestRate: number;
    penaltyRate: number;
    members: MemberModel[];
    loans: LoanModel[];
    shares: ShareModel[];
}

declare type role = 'admin' | 'member';
declare interface RequestObj extends Request {
    auth?: {
        user_id: string;
        role: role
    }
}

declare type Handler = (req: RequestObj, res: Response, next: NextFunction) => void;

declare interface LoanRequest {
    amount: number;
    password: string;
    deadline: DateToString;
}

declare interface LoaneeStat {
    member: MemberModel;
    shares: ShareModel;
    loans: LoanModel[]
}

declare interface RepayObj {
    loanId: string;
    userId: string;
    amount: number;
}


export {
    MemberModel, SignupDetails, LoginDetails, UserProfile, AuthResponse, Handler, role,LoanModel,ShareModel, ShareHistory,
    LoanRequest, ChamaModel,LoaneeStat, RepayObj, LoanHistory
}

