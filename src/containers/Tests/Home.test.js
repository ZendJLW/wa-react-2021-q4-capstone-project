/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import BannerSlider from "../Banner/BannerSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import List from "../productList/ProductList";
import Banners from "../../mocks/en-us/featured-banners.json";
import Products from "../../mocks/en-us/featured-products.json";
import Categories from "../../mocks/en-us/product-categories.json";
import {CartProvider} from "../../context/CartContext";

describe("Home Tests", () => {
  it("Featured Banners Slider", () => {
    render(<BannerSlider banners={Banners} />);
    expect(screen.getByText(/AMAZING FINISHES - BEDROOM/i)).toBeInTheDocument();
    const image = screen.getByAltText(/AMAZING FINISHES - BEDROOM/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://images.prismic.io/wizeline-academy/edaf28da-2e46-4f75-8a69-a972119f40ed_banner-3-2.jpeg?auto=compress,format&rect=0,0,1429,700&w=1440&h=705",
    );
  });

  it("Categories Carousel", () => {
    render(
      <BrowserRouter>
        <CategoriesSlider categories={Categories.results} />{" "}
      </BrowserRouter>,
    );
    expect(screen.getByText(/Bed & Bath/i)).toBeInTheDocument();
    const image1 = screen.getByAltText(/Bath/i);
    expect(image1).toBeInTheDocument();
    expect(image1).toHaveAttribute(
      "src",
      "https://images.prismic.io/wizeline-academy/5df875b5-3e43-4cf0-97b9-06ed73ed6d9b_sanibell-bv-530lZQXMKGw-unsplash-web+%281%29.jpg?auto=compress,format&rect=0,24,1920,1231&w=621&h=398",
    );

    expect(screen.getByText(/Lighting/i)).toBeInTheDocument();
    const image2 = screen.getByAltText(/Lighting/i);
    expect(image2).toBeInTheDocument();
    expect(image2).toHaveAttribute(
      "src",
      "https://images.prismic.io/wizeline-academy/fdc4897a-c224-450f-9378-a39d2afaa7f6_zero-take-uLcBn2TsavU-unsplash-web+%281%29.jpg?auto=compress,format&rect=1,0,1919,1230&w=621&h=398",
    );

    expect(screen.getByText(/Kitchen/i)).toBeInTheDocument();
    const image3 = screen.getByAltText(/Kitchen/i);
    expect(image3).toBeInTheDocument();
    expect(image3).toHaveAttribute(
      "src",
      "https://images.prismic.io/wizeline-academy/650366df-0405-4712-bd3b-2703d87e7a61_watermark-designs-XL6gfkLmkOw-unsplash-web+%281%29.jpg?auto=compress,format&rect=0,26,1920,1231&w=621&h=398",
    );
  });

  it("Featured Products Grid", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <List Products={Products} />
        </CartProvider>
      </BrowserRouter>,
    );
    expect(
      screen.getByText("[furniture]Tallulah Sofa Gray"),
    ).toBeInTheDocument();
    expect(screen.getByText(`$ 1834.57`)).toBeInTheDocument();
    const image1 = screen.getByAltText(/Tallulah Sofa Gray/i);
    expect(image1).toBeInTheDocument();
    expect(image1).toHaveAttribute(
      "src",
      "https://images.prismic.io/wizeline-academy/fa394f7d-4d89-4c90-86b3-832de74928fa_1.webp?auto=compress,format",
    );

    expect(
      screen.getByText("[furniture]Tyler Poly Reclining Leather Armchair"),
    ).toBeInTheDocument();
    expect(screen.getByText(`$ 2124.25`)).toBeInTheDocument();
    const image2 = screen.getByAltText(
      /Tyler Poly Reclining Leather Armchair/i,
    );
    expect(image2).toBeInTheDocument();
    expect(image2).toHaveAttribute(
      "src",
      "https://images.prismic.io/wizeline-academy/6b30b79d-12c6-4411-9808-2f629d141afe_1.webp?auto=compress,format",
    );

    expect(screen.getByText("[furniture]Grayton Armchair")).toBeInTheDocument();
    expect(screen.getByText(`$ 1689.74`)).toBeInTheDocument();
    const image3 = screen.getByAltText(/Grayton Armchair/i);
    expect(image3).toBeInTheDocument();
    expect(image3).toHaveAttribute(
      "src",
      "https://images.prismic.io/wizeline-academy/2a136772-dcee-4eba-9da4-ad3468504bdb_1.webp?auto=compress,format",
    );
  });
});
