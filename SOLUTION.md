SOLUTION
========

Estimation
----------
Estimated: 5 hours

Spent: 4 hours and 40 minutes

My consideration of this estimate is that I must first transition the react app to typescript and then add a buffer for bug fixing or other hindrances that may impact progress.

Solution
--------
My main goal when developing this application is to leverage the S.O.L.I.D principle to make it easier to comprehend and debug the components.

First, I changed the create react application to typescript and updated the relevant files.
Then I created the ProductContainer component to hold the Product table and sidebar.

On initial load, it will call [proc](http://localhost:3010/products?_page=1&_limit=12)http://localhost:3010/products?_page=1&_limit=12 to load all the products. This can be accomplished by accessing [proc](http://localhost:3010/products)http://localhost:3010/products. However, my method is to call with _page and _limit because my function is created to call the backend API with dynamic queries. I also limit the number of data points displayed on the table by selecting 3, 9, or 12. The default is 12. My rationale for doing this is to highlight the pagination. However, the limit applies only if you have not filtered the data.

Filtering
- I used the **useSearchParams()** from **react-router-dom** to set and get the query params from the url. When fetching the data I only used the native fetch api.
- Everytime you changed the tag, price or subscription. It will automatically call the backend and update the table
- I also added a reset button to clear the input fields and reset the table.

Packages used
--------
- ShadCn / Tailwind
- Zustand - I could have used redux or react context for this but zustand is way more simplier and less boilerplate
- React hook form
- Typescript
