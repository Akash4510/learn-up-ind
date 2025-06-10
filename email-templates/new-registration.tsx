import { User } from "@prisma/client";

export const NewRegistrationTemplate = (user: User) => {
  return (
    <div>
      <p className="text-lg">
        Hi, <span className="font-semibold">{user.name}</span>, Your email:{" "}
        <span className="font-semibold">{user.email}</span> has been
        successfully registered.
      </p>

      <p>
        You can now start exploring
        <a href="https://learnupind.com/courses">our courses</a>
      </p>

      <p>
        Thank you for registering to
        <a href="https://learnupind.com">Learn Up Ind</a>
      </p>

      <p>Let&apos;s learn and earn together</p>
    </div>
  );
};
