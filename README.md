This is an example of how to do 0xcertAPI orders.

The example is wrapped in a simple dApp to showcase not only functionalities but also the basic principles of handling blockchain communication through 0xcertAPI. Main logic is isolated in `src/example.ts` while response handling is located in `index.ts`. The basic configuration needed for communication can be found in the `src/config.ts` file.

To keep the example as simple as possible, some values are hardcoded, such as the kind of value ledger we are deploying. You can change those values in the `src/example.ts` file.

The `src/config.ts` file also contains and empty variable that you need to set for the example to work. It is `assetLedgerId` which you get through the deployment example.

Project stucture:

| Path | Description
|-|-
| src/example.ts | Main logic showing the use.
| src/config.ts | Configuration file.
| index.html | Front end styling.
| index.ts | Controller connecting front end to the logic.
| package.json | Dependencies.
