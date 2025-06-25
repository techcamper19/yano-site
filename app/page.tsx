'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";

export default function Step1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    birthDate: "",
    birthTime: "",
    gender: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('birthData', JSON.stringify(formData));
    router.push('/get-email');
  };

  return (
    <>
      <Head>
        <title>Birth Details | Personal Insight Chart</title>
        <meta name="description" content="Enter your birth details to begin your personal insight journey" />
        <meta property="og:title" content="Birth Details" />
        <meta property="og:description" content="Start discovering your personal insight" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        <header className="container mx-auto px-4 py-8 text-center">
          <Compass size={48} className="mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
            Enter Your Birth Details
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto">
            This information helps us calculate your unique personal insight chart
          </p>
        </header>

        <section className="container mx-auto px-4 py-8 max-w-md">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">Birth Date</label>
                    <Input 
                      type="date" 
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                      className="w-full p-2.5 border rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium">Birth Time</label>
                      <Input 
                        type="time" 
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleChange}
                        required
                        className="w-full p-2.5 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">Gender</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2.5 border rounded-md"
                        required
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 mt-4 py-3">
                    Continue to Email
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
