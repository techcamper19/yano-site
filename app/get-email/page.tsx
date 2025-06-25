'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Step2() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: ""
  });
  const [birthData, setBirthData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('birthData');
    if (!savedData) {
      router.push('/');
      return;
    }
    setBirthData(JSON.parse(savedData));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert("Emails don't match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xdkzpwpq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...birthData, ...formData })
      });

      if (response.ok) {
        localStorage.removeItem('birthData');
        router.push('/success');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      alert('Submission failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!birthData) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading your information...</p>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Email Confirmation | Personal Insight Chart</title>
        <meta name="description" content="Enter your email to receive your personal insight chart" />
        <meta property="og:title" content="Email Confirmation" />
        <meta property="og:description" content="Receive your personal insight chart" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        <header className="container mx-auto px-4 py-8 text-center">
          <Mail size={48} className="mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
            Where Should We Send Your Chart?
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto">
            Enter your email to receive your personalized insight chart
          </p>
        </header>

        <section className="container mx-auto px-4 py-8 max-w-md">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <Input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-2.5 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Confirm Email</label>
                    <Input 
                      type="email" 
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleChange}
                      required
                      className="w-full p-2.5 border rounded-md"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      type="button" 
                      onClick={() => router.push('/')}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 py-3"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-purple-600 hover:bg-purple-700 py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Get My Chart'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>We'll send your personalized chart to your email within 24 hours</p>
          </div>
        </section>
      </div>
    </>
  );
}
