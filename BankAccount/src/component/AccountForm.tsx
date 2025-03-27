import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" }),
  dob: z.string().regex(/\d{4}-\d{2}-\d{2}/, {
    message: "Invalid date format (YYYY-MM-DD)",
  }),
  accountType: z.enum(["savings", "current"], {
    message: "Account type is required",
  }),
  initialDeposit: z.number().min(100, { message: "Minimum deposit is $100" }),
  currency: z.enum(["USD", "EUR", "LKR"], {
    message: "Select a valid currency",
  }),
  streetaddress: z.string().nonempty({ message: "Street address is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  zipcode: z.string().nonempty({ message: "Zip code is required" }),
});

type FormDataType = z.infer<typeof schema>;

const AccountForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      <h1 className="text-2xl font-medium text-center col-span-3">
        Create New Account
      </h1>
      {/* Personal Information */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
          Personal Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register("fullname")}
            className={`w-full px-4 py-2 border ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.fullname && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register("phone")}
            className={`w-full px-4 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob")}
            className={`w-full px-4 py-2 border ${
              errors.dob ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
          )}
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
          Account Details
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Type
          </label>
          <select
            {...register("accountType")}
            className={`w-full px-4 py-2 border ${
              errors.accountType ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
          >
            <option value="">Select type</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select>
          {errors.accountType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.accountType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            {...register("currency")}
            className={`w-full px-4 py-2 border ${
              errors.currency ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]`}
          >
            <option value="">Select currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="LKR">LKR</option>
          </select>
          {errors.currency && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currency.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Deposit
          </label>
          <input
            type="number"
            {...register("initialDeposit", { valueAsNumber: true })}
            className={`w-full px-4 py-2 border ${
              errors.initialDeposit ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.initialDeposit && (
            <p className="mt-1 text-sm text-red-600">
              {errors.initialDeposit.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
          Address
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            {...register("streetaddress")}
            className={`w-full px-4 py-2 border ${
              errors.streetaddress ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.streetaddress && (
            <p className="mt-1 text-sm text-red-600">
              {errors.streetaddress.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register("city")}
            className={`w-full px-4 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code
          </label>
          <input
            {...register("zipcode")}
            className={`w-full px-4 py-2 border ${
              errors.zipcode ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
          />
          {errors.zipcode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.zipcode.message}
            </p>
          )}
        </div>

        <div className="md:col-span-3 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70"
          >
            {isSubmitting ? "Processing..." : "Create Account"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;



// import { FieldValues, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const schema = z.object({
//   fullname: z
//     .string()
//     .min(3, { message: "Full name must be at least 3 characters long" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   phone: z
//     .string()
//     .length(10, { message: "Phone number must be exactly 10 digits" }),
//   dob: z.string().regex(/\d{4}-\d{2}-\d{2}/, {
//     message: "Invalid date format (YYYY-MM-DD)",
//   }),
//   accountType: z.enum(["savings", "current"], {
//     message: "Account type is required",
//   }),
//   initialDeposit: z.number().min(100, { message: "Minimum deposit is $100" }),
//   currency: z.enum(["USD", "EUR", "LKR"], {
//     message: "Select a valid currency",
//   }),
//   streetaddress: z.string().nonempty({ message: "Street address is required" }),
//   city: z.string().nonempty({ message: "City is required" }),
//   zipcode: z.string().nonempty({ message: "Zip code is required" }),
// });

// type FormDataType = z.infer<typeof schema>;

// const AccountForm = () => {
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm<FormDataType>({ resolver: zodResolver(schema) });

//   const onSubmit = (data: FieldValues) => console.log(data);

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       {/* Personal Information */}
//       <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Personal Information
//         </h2>
//         <label className="block text-gray-700">Full Name</label>
//         <input {...register("fullname")} className="input-field" />
//         {errors.fullname && (
//           <p className="error-text text-red-500">{errors.fullname.message}</p>
//         )}

//         <label className="block text-gray-700 mt-3">Email</label>
//         <input {...register("email")} className="input-field" />
//         {errors.email && (
//           <p className="error-text text-red-500">{errors.email.message}</p>
//         )}

//         <label className="block text-gray-700 mt-3">Phone Number</label>
//         <input {...register("phone")} className="input-field" />
//         {errors.phone && (
//           <p className="error-text text-red-500">{errors.phone.message}</p>
//         )}

//         <label className="block text-gray-700 mt-3">Date of Birth</label>
//         <input type="date" {...register("dob")} className="input-field" />
//         {errors.dob && (
//           <p className="error-text text-red-500">{errors.dob.message}</p>
//         )}
//       </div>

//       {/* Account Details */}
//       <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Account Details
//         </h2>
//         <label className="block text-gray-700">Account Type</label>
//         <select {...register("accountType")} className="input-field">
//           <option value="savings">Savings</option>
//           <option value="current">Current</option>
//         </select>
//         {errors.accountType && (
//           <p className="error-text error-text text-red-500">
//             {errors.accountType.message}
//           </p>
//         )}

//         <label className="block text-gray-700 mt-3">Initial Deposit</label>
//         <input
//           type="number"
//           {...register("initialDeposit")}
//           className="input-field"
//         />
//         {errors.initialDeposit && (
//           <p className="error-text text-red-500">
//             {errors.initialDeposit.message}
//           </p>
//         )}
//       </div>

//       {/* Address */}
//       <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
//         <label className="block text-gray-700">Street Address</label>
//         <input
//           {...register("streetaddress")}
//           className="input-field"
//           placeholder="123 Main St"
//         />
//         {errors.streetaddress && (
//           <p className="error-text text-red-500">
//             {errors.streetaddress.message}
//           </p>
//         )}

//         <label className="block text-gray-700 mt-3">City</label>
//         <input {...register("city")} className="input-field" />
//         {errors.city && (
//           <p className="error-text text-red-500">{errors.city.message}</p>
//         )}

//         <label className="block text-gray-700 mt-3">Zip Code</label>
//         <input {...register("zipcode")} className="input-field" />
//         {errors.zipcode && (
//           <p className="error-text text-red-500">{errors.zipcode.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//       >
//         Create Account
//       </button>
//     </form>
//   );
// };

// export default AccountForm;
