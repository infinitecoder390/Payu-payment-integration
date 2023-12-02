"use client";
import Image from "next/image";
import apiClient from "../../common/api";
import { useEffect, useState } from "react";
export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    amount: 0,
  });
  const [toggle, setToggle] = useState(1);
  const [hash, setHash] = useState("");
  const [transactionId, setTransactionId] = useState<any>(null);
  const handleOnChangeEvent = (e: any) => {
    if (e.target.name === "amount") {
      setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const generateTransactionID = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000);
    const merchantPrefix = "T";
    const transactionId = `${merchantPrefix}${timeStamp}${randomNumber}`;
    setTransactionId(transactionId);
  };
  useEffect(() => {
    generateTransactionID();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getHash();
    setToggle(2);
  };
  const getHash = async () => {
    await apiClient
      .post("/api/payu/hash", {
        ...form,
        transactionId: transactionId,
      })
      .then((data) => {
        setHash(data.data.hash);
        setTransactionId(data.data.transactionId);
      })
      .catch((er) => console.log("err", er));
  };

  return (
    <div className="flex min-h-screen bg-red-200 flex-row items-center justify-between p-24">
      <div>
        <Image
          src="/payout.png"
          alt="Description of the image"
          width={800}
          height={500}
        />
      </div>
      <div>
        <div className="w-full max-w-lg">
          {toggle === 1 && (
            <>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    placeholder="Enter Your name"
                    autoComplete="false"
                    onChange={handleOnChangeEvent}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="text"
                    placeholder="Enter Your Email"
                    autoComplete="false"
                    onChange={handleOnChangeEvent}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name">
                    Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="number"
                    type="text"
                    placeholder="Enter Your Number"
                    autoComplete="false"
                    onChange={handleOnChangeEvent}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name">
                    Amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="amount"
                    type="number"
                    placeholder="Enter Your amount"
                    autoComplete="false"
                    onChange={handleOnChangeEvent}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Checkout now
                  </button>
                </div>
              </form>
              <p className="text-center text-gray-500 text-xs">
                &copy;2023 Akshay Naik. All rights reserved.
              </p>
            </>
          )}
          {toggle === 2 && (
            <>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src="/checkpay.jpg"
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Check Payment Details
                  </div>
                  <p className="text-gray-700 text-base">
                    Transaction ID : {transactionId}
                  </p>
                  <p className="text-gray-700 text-base">Name :{form.name}</p>
                  <p className="text-gray-700 text-base">
                    Number :{form.number}
                  </p>
                  <p className="text-gray-700 text-base">
                    Amount : {form.amount} &#8377;/-
                  </p>
                  <p className="text-gray-700 text-base">
                    Kindly check your details before clicking pay now.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <form
                    action={"https://secure.payu.in/_payment"}
                    method="post">
                    <input type="hidden" name="key" value={"ZXJrugDF"} />
                    <input type="hidden" name="txnid" value={transactionId} />
                    <input type="hidden" name="amount" value={form.amount} />
                    <input
                      type="hidden"
                      name="productinfo"
                      value={"Test Product"}
                    />
                    <input type="hidden" name="firstname" value={form.name} />
                    <input type="hidden" name="email" value={form.email} />
                    <input type="hidden" name="phone" value={form.number} />
                    <input
                      type="hidden"
                      name="surl"
                      value={"http://localhost:3030/api/payu/success"}
                    />
                    <input
                      type="hidden"
                      name="furl"
                      value={"http://localhost:3030/api/payu/failure"}
                    />
                    <input type="hidden" name="udf1" value={"details1"} />
                    <input type="hidden" name="udf2" value={"details2"} />
                    <input type="hidden" name="udf3" value={"details3"} />
                    <input type="hidden" name="udf4" value={"details4"} />
                    <input type="hidden" name="udf5" value={"details5"} />
                    <input type="hidden" name="hash" value={hash} />
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Pay now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
