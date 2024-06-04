import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className=" overflow-hidden py-10 sticky w-full bottom-0 bg-black border border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6  ">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center"></div>
              <div>
                <p className="text-sm text-white">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
