import CreateBucket from "@/views/CreateBucket";
import Head from "next/head";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Create case</title>
        <meta name="description" content="Create Bucket - Finn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://i.pinimg.com/originals/d7/91/1c/d7911c291cc89cad36f20b9382c945b0.gif" />
      </Head>
      <CreateBucket />
    </>
  );
}
