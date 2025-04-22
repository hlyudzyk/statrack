"use client";

import { Footer } from "flowbite-react";
import {useRouter} from "next/navigation";

const FooterComponent = () => {
  const router = useRouter();
  return (
      <Footer>
        <div className="w-full text-center p-10">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
                href="£"
                src="favicon_next.ico"
                alt="Statrack Logo"
                name="Statrack"
            />
            <Footer.LinkGroup>
              <Footer.Link onClick={()=>router.push("about")} href="#">About</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="#" by="Statrack™" year={2025} />
        </div>
      </Footer>
  );
}

export default FooterComponent;