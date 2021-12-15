/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React from "react";
// import {BrowserRouter, Routes, Route} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {rest} from "msw";
import {setupServer} from "msw/node";
import BannerSlider from "./BannerSlider";
import Banners from "../../mocks/en-us/featured-banners.json";
import {Products} from "../../mocks/en-us/featured-products.json";
import {Categories} from "../../mocks/en-us/product-categories.json";
import {useFeaturedBanners} from "../../utils/hooks/useFeaturedBanners";
import {useFeaturedProducts} from "../../utils/hooks/useFeaturedProducts";
import {useFeaturedCategories} from "../../utils/hooks/useFeaturedCategories";

describe("App", () => {
  it("pagination", () => {
    //const {banners, isLoading} = await useFeaturedBanners();
    render(<BannerSlider banners={Banners} />);
    expect(screen.getByText(/AMAZING FINISHES - BEDROOM/i)).toBeInTheDocument();
  });
});

//import BannerSlider from './BannerSlider';
// import Banner from "./Banner";
// Banners
// https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22banner%22)%5D%5D&lang=en-us&pageSize=5
// Categorias
// https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22category%22)%5D%5D&lang=en-us&pageSize=30
// Productos
// https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bat(document.tags%2C%20%5B%22Featured%22%5D)%5D%5D&lang=en-us&pageSize=16
/*
const bannersResponse = () => {
  rest.get(
    "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22banner%22)%5D%5D&lang=en-us&pageSize=5",
    (req, res, ctx) => res(ctx.json(useFeaturedBanners())),
  );
};

const productsResponse = () => {
  rest.get(
    "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bat(document.tags%2C%20%5B%22Featured%22%5D)%5D%5D&lang=en-us&pageSize=16",
    (req, res, ctx) => res(ctx.json(useFeaturedProducts())),
  );
};

const categoriesResponse = () => {
  rest.get(
    "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22category%22)%5D%5D&lang=en-us&pageSize=30",
    (req, res, ctx) => res(ctx.json(useFeaturedCategories())),
  );
};
*/

/*
const apiServer = setupServer(
  rest.get("https://www.googleapis.com/youtube/v3/search", (req, res, ctx) => {
    const query = req.url.searchParams;
    const maxResultsNum = query.get("maxResults");
    const relatedToVideoId = query.get("relatedToVideoId");

    if (relatedToVideoId === null) return res(ctx.status(400));
    return res(ctx.json({items: mockVideos.items.slice(0, maxResultsNum)}));
  }),
);*/
/*
  const handlers = [bannersResponse];
// eslint-disable-next-line new-cap
  const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
*/
