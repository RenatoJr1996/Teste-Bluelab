export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    public readonly sucess: boolean;


    constructor(message:string, statusCode = 400, sucess = false){
        this.message = message;
        this.statusCode = statusCode;
        this.sucess = sucess;


    }
}