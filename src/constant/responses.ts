class Responses {
    generic_response = (
        status: number,
        success: boolean,
        data: any = null,
        error: string | null = null,
    ) => {
        return {
            status: {
                code: status,
                success,
            },
            data,
            message: error,
        };
    };

    ok_response = (data: any | null = null, message: string | null = null) => {
        return {
            status: {
                code: 200,
                success: true,
            },
            data,
            error: null,
            message,
        };
    };

    create_success_response = (data: any = null, message = "successfully created") => ({
        status: {
            code: 201,
            success: true,
        },
        data,
        error: null,
        message,
    });

    update_success_response = (data: any = null, message = "succesfully updated") => ({
        status: {
            code: 200,
            success: true,
        },
        data,
        error: null,
        message,
    });

    delete_success_response = (data: any = null, message = "successfully deleted") => ({
        status: {
            code: 200,
            success: true,
        },
        data,
        error: null,
        message,
    });
    bad_request_error = (error:string|null = null, data: any = null) => ({
        status: {
            code: 400,
            success: false,
        },
        data,
        message: error,
    });

    not_found_error = (error:string|null = null) => ({
        status: {
            code: 404,
            success: false,
        },
        data: null,
        message: error,
    });

    unauthorized_error = (error = null) => ({
        status: {
            code: 401,
            success: false,
        },
        data: null,
        message: error,
    });
}

export default Responses;
