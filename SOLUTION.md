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
- I used the `useSearchParams()` from `react-router-dom` to set and get the query params from the url. When fetching the data I only used the native fetch api.
- Everytime you changed the tag, price or subscription. It will automatically call the backend and update the table
- I also added a reset button to clear the input fields and reset the table.
- I added a title search to utilize the remainig backend endpoint

Test Cases
--------
**Test Case 1**: Basic Product Collection Page View. <br>
&nbsp;&nbsp;Scenario: User visits the product collection page.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see the filters sidebar.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see a table of products.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- There should be exactly 12 products displayed in the table.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- Pagination controls should be visible.<br>

**Test Case 2**: Filter by Tag <br>
&nbsp;&nbsp;Scenario: User visits the product collection page.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see filters sidebar specifically for tags.<br>
&nbsp;&nbsp;_Action_: User searches for "Dog" in the filters tags sidebar.<br>
&nbsp;&nbsp;- **Expected Outcome**:<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see 11 products related to dogs in the resulting table.<br>

**Test Case 3**: Filter by Price
&nbsp;&nbsp;Scenario: User visits the product collection page.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see filters sidebar.<br>
&nbsp;&nbsp;_Action:_ User filters by "Price" with a value of "30" in the sidebar.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see only 1 product in the resulting table, price should not be greater than $30.<br>

**Test Case 4**: Filter by Subscription and Search<br>
&nbsp;&nbsp;Scenario: User visits the product collection page.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see filters sidebar.<br>
&nbsp;&nbsp;_Action:_ User filters by "Subscription" with a value of "Yes" in the sidebar.<br>
&nbsp;&nbsp;_Action:_ User searches for "Cat" in the filters tags sidebar.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see 5 products related to cats in the resulting table.<br>

**Test Case 5:** Pagination Functionality<br>
&nbsp;&nbsp;Scenario: User visits the product collection page with more than 12 products available.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see the filters sidebar.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see a table of products with 12 products initially.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- Pagination controls should be visible.<br>
&nbsp;&nbsp;_Action:_ User change the value of **_items per page_** to enable the pagination controls.<br>
&nbsp;&nbsp;_Action:_ User clicks on the pagination control to view the next page.<br>
&nbsp;&nbsp;**Expected Outcome:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;- User should see the next set of products in the table

Packages used
--------
- ShadCn / Tailwind
- Zustand - I could have used redux or react context for this but zustand is way more simplier and less boilerplate
- React hook form
- Typescript
