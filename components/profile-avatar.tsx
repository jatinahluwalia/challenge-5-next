import Image from "next/image";

interface Props {
  image: string;
}

const ProfileAvatar = ({ image }: Props) => {
  return (
    <Image
      src={image}
      alt="image"
      width={50}
      height={50}
      className="rounded-full object-cover h-max"
    />
  );
};

export default ProfileAvatar;
