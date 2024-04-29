// Import necessary components and libraries
'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { TagsInput } from "react-tag-input-component";  
import { ToastContainer, toast } from 'react-toastify';



import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
// Initialize Firebase
const firebaseConfig = {
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Define your form schema
const formSchema = z.object({
  username: z.string().min(2).max(50),
  gamedesc: z.string().min(5).max(350),
  images: z.array(z.string().url()),
  tags: z.array(z.string())
});

  export default function AddGame() {
    const [selected, setSelected] = useState(["Adventure"]); 
    


    useEffect(() => {
      const tags = document.querySelectorAll('.rti--tag');
      tags.forEach(tag => {
          const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
          const element = tag as HTMLElement;
          element.style.backgroundColor = randomColor;
      });
  }),[selected]; // Empty dependency array ensures this effect runs only once after initial render

    const [imageUrls, setImageUrls] = useState<string[]>([]); // State to store the image URLs
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        gamedesc: "",
        images: [], // Set default value for images field
        tags:[]
      },
    });
  
    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
      const files = event.target.files; // Get the uploaded files
      const urls: string[] = [];
  
      for (let i = 0; i < files!.length; i++) {
        const file = files![i];
        const storageRef = ref(storage,  `${form.getValues("username")}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file); // Upload file to Firebase Storage
  
        // Get download URL of the uploaded file
        const downloadUrl = await getDownloadURL(snapshot.ref);
        urls.push(downloadUrl);
      }
  
      setImageUrls(urls); // Set image URLs in state
      form.setValue("images", urls); // Set image URLs in form field
    }
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      const notify = () => toast("Succesfully Uploaded");

        try {
            const db = getFirestore(app);
            const customDocumentId = values.username;

            const gameDocRef = doc(collection(db, 'games'), customDocumentId);

            await setDoc(gameDocRef, {
              username: values.username,
              gamedesc: values.gamedesc,
              images: values.images,
              tags: selected
            });
            // await addDoc(collection(db, "games"), {
            //   username: values.username,
            //   gamedesc: values.gamedesc,
            //   images: values.images,
            // });
            // toast.success("Images uploaded successfully!", {
            //   position: "top-right",
            //   autoClose: 3000, // Close the toast after 3 seconds
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            // });
            console.log("Data submitted successfully!");
           
            
            notify();
            // Optionally, you can reset the form after successful submission
            form.reset();
          } catch (error) {
            console.error("Error submitting data:", error);
          }
      console.log(values);
    }

  
  
    return (
      
      <div className="formContainer flex justify-center">
              {/* <ToastContainer className="absolute top-0 rounded-lg" /> */}

      <div className="lopsided">
      <ToastContainer />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Existing form fields */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter game name" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gamedesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About the Game</FormLabel>
                <FormControl>
                  <Input style={{height:"105px"}}  placeholder="Enter game description" {...field} />
                </FormControl>
                <FormDescription>Tell what you felt exactly after completing the game.</FormDescription>


                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image upload field for multiple files */}
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          {/* Display uploaded images */}
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "10px" }} />
          ))}


<FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Relevant Tags</FormLabel>
                <FormControl>
                <div> 
    
      <div> 
      <TagsInput 
        value={selected} 
        onChange={setSelected} 
        name="tags"
        placeHolder="Add Maximum 5 tags"
      /> 
      </div> 
    </div> 
                </FormControl>
                <FormDescription>Help us understand what type of game is this</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
      </div>
    );
  }
  
