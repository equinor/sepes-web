# Sepes Access control

Ønsker at løsningen skal ha minst mulig med Equionor å gjøre. For å redusere risk bildet. Kun roller som er nødvendige i AccessIT skal være i AccessIT

/TODO Check non-accessit roles - can guest users in azure ad be deleted fom azure ad when study is deleted. 

/TODO Dataset admin: 

/TODO Allow to set study restricted after it has been unrestricted? (At leastd need warnings)

Noen tilganger er avhengig av status på sandbox. Noen roller mister tilgang når sandbox er låst

The following sections describe which permissions are granted by the various access roles

All with Equinor accounts can see all unrestricted studies

| **Front page**             | **Sponsor<br/>(AccessIT)** | **Admin<br/>(AccessIT)** | **Dataset Admin<br/>(AccessIT)** | **Sponsor rep** | **Vendor admin**  | **Study viewer** | **Vendor contributor**      |
| -------------------------- | -------------------------- | ------------------------ | -------------------------------- | --------------- | ----------------- | ---------------- | --------------------------- |
| View ALL unrestr. studies  | Y                          | Y                        | Y                                | Y               | -                 | -                | -                           |
| View OWN unrestr. studies  | Y                          | Y                        | Y                                | Y               | Y                 | Y                | Y                           |
| View OWN restr. studies    | Y                          | Y                        | Y                                | Y               | Y                 | Y                | Y                           |
| Create new study           | Y                          | Y                        | -                                | -               | -                 | -                | -                           |
|                            |                            |                          |                                  |                 |                   |                  |                             |
| **Study details page OWN** | **Sponsor<br/>(AccessIT)** | **Admin<br/>(AccessIT)** | **Dataset Admin<br/>(AccessIT)** | **Sponsor rep** | **Vendor admin**  | **Study viewer** | **Vendor contributor**      |
| Edit study metadata *      | Y                          | Y                        | -                                | Y               | -                 | -                | -                           |
| Link/unlink dataset **     | Y                          | -                        | -                                | Y               | -                 | -                | -                           |
| Add/remove dataset         | Y                          | -                        | -                                | Y               | -                 | -                | -                           |
| Add/remove participant     | Y                          | -                        | -                                | Y               | Y (Vendor roles)  | -                | -                           |
| Add/remove sandbox         | Y                          | -                        | -                                | Y               | Y                 | -                | -                           |
| Close Study                | Y                          | -                        | -                                | Y               | -                 | -                | -                           |
| Delete Study               | -                          | Y                        | -                                | -               | -                 | -                | -                           |
|                            |                            |                          |                                  |                 |                   |                  |                             |
| **Sandbox config page**    | **Sponsor<br/>(AccessIT)** | **Admin<br/>(AccessIT)** | **Dataset Admin<br/>(AccessIT)** | **Sponsor rep** | **Vendor admin**  | **Study viewer** | **Vendor contributor**      |
| Lock sandbox               | Y                          | Y                        | -                                | Y               | Y                 | -                | -                           |
| Unlock sandbox             | Y***                       | Y***                     | -                                | Y***            | -                 | -                | -                           |
| Edit rules                 | Y                          | Y                        | -                                | Y               | Y                 | -                | -                           |
| Edit sandbox               | Y                          | Y                        | -                                | Y               | Y                 | -                | -                           |
|                            |                            |                          |                                  |                 |                   |                  |                             |
| **Sandbox execution page** | **Sponsor<br/>(AccessIT)** | **Admin<br/>(AccessIT)** | **Dataset Admin<br/>(AccessIT)** | **Sponsor rep** | **Vendor admin**  | **Study viewer** | **Vendor contributor**      | 
|                            |                            |                          |                                  |                 |                   |                  |                             |
| **Sandbox closed page**    | **Sponsor<br/>(AccessIT)** | **Admin<br/>(AccessIT)** | **Dataset Admin<br/>(AccessIT)** | **Sponsor rep** | **Vendor admin**  | **Study viewer** | **Vendor contributor**      |
|                            |                            |                          |                                  |                 |                   |                  |                             |
| **Study details page**     | **Sponsor<br/>(AccessIT)** | **Admin<br/>(AccessIT)** | **Dataset Admin<br/>(AccessIT)** | **Sponsor rep** | **Vendor admin**  | **Study viewer** | **Vendor contributor**      |


> \* Study metadata includes Study name, restricted (Y/N), Study description and avatar
> \** Add datasets available for this study. Need some way to mark datasets in an "Dataset Admin page".
> \*** Requires Dataset Admin approval
