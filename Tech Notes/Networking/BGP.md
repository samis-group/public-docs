# BGP

If you want to check whether we are advertising a BGP route for someone, use our looking glass and select the “BGP Route” query → [https://lg.as55803.net.au/](https://lg.as55803.net.au/)

If there is no “AS Path”, then we are advertising the range via BGP as it doesn’t need to go to another AS. Example:

![BGP1.png](/artifacts/images/Networking/BGP1.png)

If there is an “AS Path”, then we are NOT advertising BGP for this address or range and it is being advertised by the AS shown in the looking glass. Example showing the BGP route being advertised by AS number `133159`:

![BGP2.png](/artifacts/images/Networking/BGP2.png)
