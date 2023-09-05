import mongoose, {Connection} from "mongoose";
export default class Database {
    constructor(url) {
        this.connect(url).then(() => {
            console.log( '✔ Database Connected' );
        } ).catch( ( err ) => {
            console.error( '✘ MONGODB ERROR: ', err.message );
        } );
    }

    async connect( url ) {
        try {
            // this.connection =
            await mongoose.connect(url);

            // this.connection.on("connection", () => {
            //     console.log("DSADSADDSADSA")
            // })

        } catch ( e ) {
            throw e;
        }
    }
}