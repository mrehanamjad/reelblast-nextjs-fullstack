// "use client";
// import Logo from "@/components/Logo";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button, Loader, TextInput, Textarea } from "@mantine/core";
// import React, { useState, useEffect } from "react";
// import { AtSign, User, Phone, FileText, Link2, Plus, Trash2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useSession } from "next-auth/react";
// import ScreenLoader from "@/components/ScreenLoader";

// type FormValues = {
//   userName: string;
//   name: string;
//   profilePicUrl: string;
//   phone: string;
//   bio: string;
// };

// export default function UpdateProfile() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [socialLinks, setSocialLinks] = useState<string[]>([""]);
//   const [error, setError] = useState<string | null>(null);

//   const { data: session } = useSession();
//   const userId = session?.user?.id;
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormValues>();

//   // Fetch user data on component mount
//   useEffect(() => {
//     if (!userId) {
//       setIsFetching(false);
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`/api/user/${userId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }

//         const userData = await response.json();
//         setSocialLinks(userData.socialLinks?.length ? userData.socialLinks : [""]);
//         reset({
//           userName: userData.userName || "",
//           name: userData.name || "",
//           profilePicUrl: userData.profilePicUrl || "",
//           phone: userData.phone || "",
//           bio: userData.bio || "",
//         });
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setError("Failed to load profile data.");
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchUserData();
//   }, [userId, reset]);

//   const addSocialLink = () => setSocialLinks([...socialLinks, ""]);
//   const removeSocialLink = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));
//   const updateSocialLink = (index: number, value: string) => {
//     const updatedLinks = [...socialLinks];
//     updatedLinks[index] = value;
//     setSocialLinks(updatedLinks);
//   };

//   const onSubmit = async (data: FormValues) => {
//     if (!userId) return;

//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/user/update", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, ...data, socialLinks }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Profile update failed");
//       }

//       router.push(`/${userId}`);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setError(error instanceof Error ? error.message : "Failed to update profile. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isFetching) return <ScreenLoader />;

//   if(!session || !userId) {
//     router.push('/login')
//     return null;
//   }

//   return (
//     <div className="flex justify-around items-center w-full pt-4">
//       <div className="p-6 rounded shadow-md">
//         <form onSubmit={handleSubmit(onSubmit)} className="w-96">
//           <div className="mx-auto mb-6 flex justify-center">
//             <Logo size="xl" />
//           </div>

//           <h1 className="text-2xl font-bold mb-6 text-center">Update Your Profile</h1>

//           {error && <p className="text-red-500 text-center">{error}</p>}

//           <TextInput
//             className="mb-4"
//             leftSection={<AtSign size={16} />}
//             label="Username"
//             placeholder="your@userName.com"
//             error={errors.userName?.message}
//             {...register("userName", { required: "Username is required" })}
//           />

//           <TextInput
//             className="mb-4"
//             leftSection={<User size={16} />}
//             label="Full Name"
//             placeholder="John Doe"
//             error={errors.name?.message}
//             {...register("name", { required: "Name is required" })}
//           />

//           <TextInput
//             className="mb-4"
//             label="Profile Picture URL"
//             type="url"
//             placeholder="https://example.com/your-image.jpg"
//             error={errors.profilePicUrl?.message}
//             {...register("profilePicUrl")}
//           />

//           <TextInput
//             className="mb-4"
//             leftSection={<Phone size={16} />}
//             label="Phone Number"
//             type="tel"
//             placeholder="+1 (555) 123-4567"
//             error={errors.phone?.message}
//             {...register("phone")}
//           />

//           <Textarea
//             className="mb-4"
//             leftSection={<FileText size={16} />}
//             label="Bio"
//             placeholder="Tell us a bit about yourself"
//             error={errors.bio?.message}
//             {...register("bio")}
//           />

//           <div className="mb-4">
//             <label className="text-sm font-medium">Social Links</label>

//             {socialLinks.map((link, index) => (
//               <div key={index} className="flex items-center gap-2 mt-2">
//                 <TextInput
//                   className="flex-grow"
//                   leftSection={<Link2 size={16} />}
//                   placeholder="https://twitter.com/username"
//                   value={link}
//                   onChange={(e) => updateSocialLink(index, e.target.value)}
//                 />

//                 {index > 0 && (
//                   <Button
//                     type="button"
//                     color="red"
//                     variant="subtle"
//                     onClick={() => removeSocialLink(index)}
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 )}
//               </div>
//             ))}

//             <Button
//               type="button"
//               className="mt-2"
//               variant="outline"
//               onClick={addSocialLink}
//               size="xs"
//               leftSection={<Plus size={16} />}
//             >
//               Add Social Link
//             </Button>
//           </div>

//           <Button
//             type="submit"
//             fullWidth
//             loading={isSubmitting}
//             className="mb-4"
//             color="cyan"
//           >
//             Update Profile
//           </Button>

//           <div className="text-center mt-4">
//             <Link href={`/${userId}`} className="text-cyan-500 hover:underline">
//               Back to Profile
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, TextInput, Textarea, Progress } from "@mantine/core";
import React, { useState, useEffect } from "react";
import {
  AtSign,
  User,
  Phone,
  FileText,
  Link2,
  Plus,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import ScreenLoader from "@/components/ScreenLoader";
import FileUpload from "@/components/VideoComps/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { apiClient } from "@/lib/api-client";
import ProfilePic from "@/components/UserComps/ProfilePic";
import { notifications } from "@mantine/notifications";

type FormValues = {
  userName: string;
  name: string;
  profilePicUrl: string;
  profilePicId: string;
  phone: string;
  bio: string;
};

export default function UpdateProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [prevProfilePicId, setPrevProfilePicId] = useState<string | null>(null);

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const username = session?.user.username;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  // Fetch user data on component mount
  useEffect(() => {
    if (!userId) {
      setIsFetching(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await apiClient.getUser(`${username}`);
        setSocialLinks(
          userData.socialLinks?.length ? userData.socialLinks : [""]
        );
        setProfilePic(userData.profilePic.url || null);
        setPrevProfilePicId(userData.profilePic.id || null);
        reset({
          userName: userData.userName || "",
          name: userData.name || "",
          profilePicUrl: userData.profilePic.url || "",
          profilePicId: userData.profilePic.id || "",
          phone: userData.phone || "",
          bio: userData.bio || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [userId, reset]);

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handleUploadSuccess = (res: IKUploadResponse) => {
    setValue("profilePicUrl", res.filePath);
    setValue("profilePicId", res.fileId);
    setProfilePic(res.filePath);
    setUploadProgress(100);
    if (prevProfilePicId) {
      apiClient
        .delFile(prevProfilePicId, "profilePic")
        .then((res) => {
          console.log("File deleted successfully:", res);
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    }
    setPrevProfilePicId(res.fileId);

    notifications.show({
      title: "Success",
      message: "Profile picture uploaded successfully",
      color: "green",
    })

  };

  const addSocialLink = () => setSocialLinks([...socialLinks, ""]);

  const removeSocialLink = (index: number) =>
    setSocialLinks(socialLinks.filter((_, i) => i !== index));

  const updateSocialLink = (index: number, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = value;
    setSocialLinks(updatedLinks);
  };

  const onSubmit = async (data: FormValues) => {
    if (!userId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      console.log("Profile data to be updated:", {
        userId,
        ...data,
        socialLinks,
      });
      await apiClient.updateUser({ userId, ...data, socialLinks });
      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green",
      });
      router.push(`/${username}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update profile",
        color: "red",
      })
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) return <ScreenLoader />;

  return (
    <div className="flex justify-around items-center w-full pt-4">
      <div className="p-6 rounded shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="w-96">
          <div className="mx-auto mb-6 flex justify-center">
            <Logo size="xl" />
          </div>

          <h1 className="text-2xl font-bold mb-6 text-center">
            Update Your Profile
          </h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <TextInput
            className="mb-4"
            leftSection={<AtSign size={16} />}
            label="Username"
            placeholder="your@userName.com"
            error={errors.userName?.message}
            {...register("userName", { required: "Username is required" })}
          />

          <TextInput
            className="mb-4"
            leftSection={<User size={16} />}
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm font-medium mb-2 block">
              Upload Profile Picture
            </label>
            <ProfilePic
              name={session?.user.username || " "}
              url={profilePic || ""}
              size="xl"
              radius={10}
              className="self-start"
            />
            <FileUpload
              fileType="image"
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Progress value={uploadProgress} size="sm" className="mt-2" />
            )}
          </div>
          <TextInput
            className="mb-4"
            leftSection={<Phone size={16} />}
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            error={errors.phone?.message}
            {...register("phone", {
              pattern: {
                value: /^\+?[0-9 ]{10,17}$/,
                message: "Invalid phone number",
              },
            })}
          />

          <Textarea
            className="mb-4"
            leftSection={<FileText size={16} />}
            label="Bio"
            placeholder="Tell us a bit about yourself"
            error={errors.bio?.message}
            {...register("bio")}
          />

          <div className="mb-4">
            <label className="text-sm font-medium">Social Links</label>

            {socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <TextInput
                  className="flex-grow"
                  leftSection={<Link2 size={16} />}
                  placeholder="https://twitter.com/username"
                  value={link}
                  onChange={(e) => updateSocialLink(index, e.target.value)}
                />

                {index > 0 && (
                  <Button
                    type="button"
                    color="red"
                    variant="subtle"
                    onClick={() => removeSocialLink(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              className="mt-2"
              variant="outline"
              onClick={addSocialLink}
              size="xs"
              leftSection={<Plus size={16} />}
            >
              Add Social Link
            </Button>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
            className="mb-4"
            color="cyan"
          >
            Update Profile
          </Button>

          <div className="text-center mt-4">
            <Link
              href={`/${username}`}
              className="text-cyan-500 hover:underline"
            >
              Back to Profile
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
