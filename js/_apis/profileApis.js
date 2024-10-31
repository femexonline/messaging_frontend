import{
    GenerateDummyDatabase
} from "../_tempDatabase/_dummyDatabase.js";



class ProfileAPI{
    static fetchMyProfile(){
        let profile=GenerateDummyDatabase.profile(["2a"]);

        return profile;
    }
}



export{
    ProfileAPI
}