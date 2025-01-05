
export const handleError = (error: any):string => {

    if(error.response) {
        const errorKey = error?.response?.data?.error as keyof typeof ErrorMessages;
        return errorKey ? ErrorMessages[errorKey] || "An unknown error occurred, Refresh and try again." : "An error occurred";
    }else if (error.status === 500){
        return ErrorMessages["Unauthorized"]
    }else{
        return ErrorMessages["NetworkError"]
    }
   
}

export const ErrorMessages = {
    "Invalid credentials": "Invalid credentials",
    NetworkError: "No internet connection. Please check your network settings or try again later.",
    Unauthorized: "Unauthorized",
}