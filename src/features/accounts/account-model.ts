export interface Role {
        id: string;
        merchant_id: string;
        store_id: string;
        external_id: string;
        name: string;
        code: string;
        description: string;
        permission_ids: string;
        status: string;
        created_at: string;
        updated_at: string;
    }

    export interface Permission {
        id: string;
        merchant_id: string;
        store_id: string;
        external_id: string;
        account_id: string;
        permissions: string;
        created_at: string;
        updated_at: string;
    }

    export interface Account {
        id: string;
        merchant_id: string;
        store_id: string;
        external_id: string;
        role_id: string;
        braintree_customer_id: string;
        username: string;
        password: string;
        email: string;
        pin_code: string;
        bar_code: string;
        qr_code: string;
        status: string;
        reason: string;
        pin_code_status: string;
        bar_code_status: string;
        qr_code_status: string;
        is_owner: boolean;
        name: string;
        first_name: string;
        last_name: string;
        phone: string;
        tax: string;
        avatar: string;
        birthday: string;
        identity_number: string;
        gender: string;
        country: string;
        country_code: string;
        region: string;
        region_code: string;
        city: string;
        zip_code: string;
        address: string;
        extension: string;
        role: Role;
        permissions: Permission[];
        created_at: string;
        updated_at: string;
    }