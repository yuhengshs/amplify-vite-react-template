import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { signUp, confirmSignUp, signIn , signOut, confirmSignIn} from "aws-amplify/auth";
import '@aws-amplify/ui-react/styles.css'


function App() {
  const [count, setCount] = useState(0);
  const [uploadProgress,] = useState(0);
  const [fileUrl,] = useState<string | null>(null);



  const handleSignUp = async () => {
    const username = 'yuhengsh@amazon.com';
    const password = 'Pass1234!';
    const email = 'yuhengsh@amazon.com';
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email
          },
          // optional
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
      console.log(isSignUpComplete);
      console.log(nextStep);
      console.log(userId);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  const handleConfirmSignUp = async () => {
    const username = 'yuhengsh@amazon.com';
    const confirmationCode = '029250';
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      console.log(isSignUpComplete);
      console.log(nextStep);
      
      
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  const handleSignIn = async() => {
    const username = "yuhengsh@amazon.com";
    const password = "Pass1234";
    try {
      const { isSignedIn, nextStep } = await signIn({ 
        username,
        options: {
          authFlowType: 'CUSTOM_WITHOUT_SRP',
        },
      });
      console.log('signing in');
      console.log('is signed in: ',isSignedIn);
      console.log('next step: ',nextStep);
      
      if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE') {
        try {
          // Use the password as the challenge response
          const output = await confirmSignIn({ challengeResponse: password });
          console.log('Sign-in successful:', output);
          return output;
        } catch (err) {
          console.log('Error during challenge confirmation:', err);
          throw err;
        }
      } else {
        console.log('Unexpected next step:', nextStep);
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const handleSignOut = async() => {
    try {
      await signOut();
      console.log("signout completed");
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  const handleGetUrl = async () => {
    // const path = `public/test123`;
    // const getUrlResult = await getUrl({
    //   path: path,
    //   // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
    //   options: {
    //     contentDisposition: 'attachment; filename="test123.png"',
    //     contentType: "image/jpeg",
    //   },
    // });
    // console.log("signed URL: ", getUrlResult.url.href);
    // console.log("URL expires at: ", getUrlResult.expiresAt);
  };

  const handleUpload = async () => {
    // Storage.put('public/test.txt', selectedFile, {
    //   progressCallback: (progress: { loaded: any; total: any; }) => {
    //     console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    //   },
    // });
    // try {
    //   if (!selectedFile) {
    //     console.log("No file selected");
    //     return;
    //   }
    //   const result = await uploadData({
    //     path: "public/album/2024/3.jpg",
    //     // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
    //     data: selectedFile,
    //     options: {
    //       contentType: "image/jpeg",
    //       onProgress: ({ transferredBytes, totalBytes }) => {
    //         if (totalBytes) {
    //           console.log(
    //             `Upload progress ${Math.round(
    //               (transferredBytes / totalBytes) * 100
    //             )} %`
    //           );
    //         }
    //       },
    //       metadata: {
    //         owner: "me",
    //         something: "3",
    //         another: "4",
    //       },
    //     },
    //   }).result;
    //   console.log("Succeeded: ", result);
    // } catch (error) {
    //   console.log("Error: ", error);
    // }
  };

  // const generateLargeMetadata = (index: number): Record<string, string> => {
  //   // const baseMetadata = {
  //   //   owner: "me",
  //   //   uploadIndex: index.toString(),
  //   //   timestamp: new Date().toISOString(),
  //   // };
  
  //   // // Add additional fields to reach approximately 1.8KB
  //   // const additionalDataNeeded = 1800 - JSON.stringify(baseMetadata).length;
  //   // const additionalField = 'x'.repeat(Math.max(0, additionalDataNeeded));
  
  //   // return {
  //   //   ...baseMetadata,
  //   //   additionalData: additionalField,
  //   // };
  // };

  const handleBulkUpload = async () => {
    // const totalUploads = 1000;
    // const results = [];
    // if (!selectedFile) {
    //   console.log("No file selected");
    //   return;
    // }
    // for (let i = 0; i < totalUploads; i++) {
    //   try {
    //     const result = await uploadData({
    //       path: `public/album/2024/file_${i + 1}.jpg`,
    //       data: selectedFile,
    //       options: {
    //         contentType: "image/jpeg",
    //         onProgress: ({ transferredBytes, totalBytes }) => {
    //           if (totalBytes) {
    //             console.log(
    //               `Upload progress for file ${i + 1}: ${Math.round(
    //                 (transferredBytes / totalBytes) * 100
    //               )}%`
    //             );
    //           }
    //         },
    //         metadata: generateLargeMetadata(i + 1),
    //       },
    //     }).result;
        
    //     console.log(`Succeeded uploading file ${i + 1}:`, result);
    //     results.push(result);
    //   } catch (error) {
    //     console.error(`Error uploading file ${i + 1}:`, error);
    //   }
    // }
  
    // console.log(`Completed ${results.length} out of ${totalUploads} uploads.`);
    // return results;
  };

  const handleGetProterty = async () => {
    // try {
    //   const result = await getProperties({
    //     path: "public/album/2024/.jpg",
    //     // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
    //   });
    //   console.log("File Properties ", result);
    // } catch (error) {
    //   console.log("Error ", error);
    // }
  };

  const handleGetList = async () => {
    // try {
    //   const listResult = await list({
    //     path: "public/album/2024/",
    //   });

    //   const itemsWithProperties = await Promise.all(
    //     listResult.items.map(async (item) => {
    //       try {
    //         const properties = await getProperties({
    //           path: item.path,
    //         });
    //         return {
    //           properties: properties,
    //         };
    //       } catch (error) {
    //         console.log(`Error getting properties for ${item.path}:`, error);
    //         return item; // Return the original item if there's an error
    //       }
    //     })
    //   );

    //   console.log("Items with Properties:", itemsWithProperties);
    // } catch (error) {
    //   console.log("Error:", error);
    // }
  };

  const handleGetProtertyOroginal = async () => {
    // console.log("Get List Clicket");
    // const startTime = performance.now();
    // try {
    //   const result = await list({
    //     path: 'public/album/2024/',
    //     options:{
    //       includeCustomMetadata: {
    //         getProperties: true
    //       },
    //     }
    //   });
    //   console.log("File Properties ", result);
    // } catch (error) {
    //   console.log(error);
    // }
    // const endTime = performance.now();
    // const totalDuration = endTime - startTime;
    // console.log(`Operation failed after ${totalDuration.toFixed(2)} ms`);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignOut}>Sign Out</button>
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleBulkUpload}>Buld Upload</button>
        <button onClick={handleGetUrl}>Get Url</button>
        <button onClick={handleGetProterty}>Get Properties</button>
        <button onClick={handleGetList}>Get List</button>
        <button onClick={handleGetProtertyOroginal}>Get List Original</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <p>Upload Progress: {uploadProgress}%</p>
      </div>
      {fileUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <a href={fileUrl} download>
            Download File
          </a>
        </div>
      )}
    </>
  );
}

export default App;
