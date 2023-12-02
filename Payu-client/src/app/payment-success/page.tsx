import Image from "next/image";
const PaymentSuccess = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Image
        src="/paymentstatus.png"
        alt="Payment Success"
        width={500}
        height={250}
        className="mb-4"
      />
      <h1 className="text-3xl text-red-700 font-bold">Payment Success</h1>
    </div>
  );
};
export default PaymentSuccess;