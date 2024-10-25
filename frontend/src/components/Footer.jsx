import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className=" overflow-hidden py-3 fixed  w-[100vw] bottom-0 bg-black border border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-2">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6  ">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm text-white">
                  &copy; Copyright 2024. All Rights Reserved by SSS.
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
