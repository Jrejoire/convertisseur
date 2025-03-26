"use client";

import { useState } from "react";
import ConversionTool from "./components/ConversionTool";

export default function Home() {
  const [passingTimes, setPassingTimes] = useState(null);

  const handlePassingTimesCalculated = (times) => {
    setPassingTimes(times);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">
            Convertisseur d'allure
          </h1>
          <p className="text-gray-400">
            Retrouve simplement tes allures d'entrainement et de course.
          </p>
        </header>
        <main className="space-y-8 h-full">
          <section className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 items-center">
            <h2 className="text-xl font-semibold text-blue-400 mb-6 text-center">
              Allure à calculer
            </h2>
            <ConversionTool
              onPassingTimesCalculated={handlePassingTimesCalculated}
            />
          </section>

          {/* Section résultat */}
          <section className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-blue-400 mb-6 text-center">
              Conversion
            </h2>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <span className="text-3xl font-bold text-blue-400">--:--</span>
              <span className="ml-2 text-gray-400">km/h</span>
            </div>
          </section>

          {/* Mettre à jour le tableau des temps de passage */}
          <section className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-blue-400 mb-6 text-center">
              Temps de passage
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-300">
                <thead className="text-xs uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Distance
                    </th>
                    <th scope="col" className="px-6 py-3">
                      2,5km
                    </th>
                    <th scope="col" className="px-6 py-3">
                      5km
                    </th>
                    <th scope="col" className="px-6 py-3">
                      10km
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Semi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Marathon
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium">
                      Temps
                    </th>
                    <td className="px-6 py-4 text-center">
                      {passingTimes?.["2,5km"] || "--:--"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {passingTimes?.["5km"] || "--:--"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {passingTimes?.["10km"] || "--:--"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {passingTimes?.["Semi"] || "--:--"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {passingTimes?.["Marathon"] || "--:--"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Développé avec ❤️ pour les runners</p>
        </footer>
      </div>
    </div>
  );
}
