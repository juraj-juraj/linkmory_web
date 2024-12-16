interface userInfo {
    name: string,
    bio: string,
    link_fb: string,
    link_insta: string,
    link_linkedin: string,
    id_fb: string,
    link_website: string,
    tel_number: string,
    email_address: string,
}

interface UserConnection {
    id_other: string,
    note: string,
}

export type {userInfo, UserConnection};
