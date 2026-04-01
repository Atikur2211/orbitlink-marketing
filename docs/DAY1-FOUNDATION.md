\# Orbitlink Day 1 Foundation



\## V1 Promise

Orbitlink v1 helps business customers view services, billing, support, orders, and documents from one portal while allowing Orbitlink to manage accounts, locations, quotes, orders, services, invoices, and tickets internally.



\## V1 Must Achieve

1\. Let Orbitlink manage a customer cleanly

2\. Let a customer log in and see core account information

3\. Create trust through visibility and structure



\## V1 Does Not Need To Achieve

1\. Full telecom automation

2\. Real-time carrier-integrated provisioning

3\. Advanced network intelligence



\## Customer Portal Modules (V1)



\### Dashboard

Shows summary of active services, open tickets, latest invoice, and current orders.



\### Services

Shows all services for the account by location with current status.



\### Billing

Shows invoices, payment status, and billing management.



\### Support

Shows tickets and allows the customer to create and track support requests.



\### Orders

Shows install and provisioning progress.



\### Documents

Shows agreements, onboarding documents, and service-related files.



\### Account Settings

Shows account details and user access.



\## Internal Admin Modules (V1)



\### Overview

Shows total accounts, active services, open tickets, and recent activity.



\### Accounts

Manage customer businesses.



\### Locations

Manage customer service addresses and site contacts.



\### Quotes

Create and track commercial offers.



\### Orders

Track all orders from submission to activation.



\### Services

Track all active and pending services.



\### Billing

Track invoices and payment status.



\### Support

Track and manage customer tickets.



\### Lifecycle Log

Track major system events (quotes, orders, activations, issues).



\## Core Lifecycle



Lead → Account → Location → Quote → Order → Service → Invoice → Support



\### Lead

Potential customer before being created as an account.



\### Account

The customer business entity.



\### Location

The physical service site.



\### Quote

Commercial proposal for service at a location.



\### Order

Accepted quote moving into delivery.



\### Service

Live or pending connectivity service.



\### Invoice

Billing record tied to the account.



\### Support

Customer issue or request during or after service.



\## Core Data Objects



\### accounts

Business customer profile.



\### account\_users

People tied to the customer account.



\### locations

Physical service sites.



\### quotes

Commercial offer records.



\### orders

Delivery workflow records.



\### service\_instances

Actual services being installed or active.



\### invoices

Billing records.



\### tickets

Support records.



\### documents

Customer-facing files such as agreements, onboarding documents, and service-related files.



\### lifecycle\_events

Event history for accountability and visibility.



\## Status Values



\### Quote Status

\- draft

\- sent

\- accepted

\- expired

\- cancelled



\### Order Status

\- draft

\- submitted

\- pending\_carrier

\- scheduled

\- installing

\- activated

\- cancelled



\### Service Status

\- pending

\- active

\- degraded

\- suspended

\- terminated



\### Ticket Status

\- new

\- open

\- waiting\_customer

\- escalated

\- resolved

\- closed



\### Invoice Status

\- draft

\- open

\- paid

\- past\_due

\- void



\## Not In Orbitlink V1



\- AI recommendation engine

\- Carrier API integrations

\- Advanced serviceability automation

\- Network telemetry dashboards

\- Usage analytics

\- Public outage center

\- Multi-province workflow logic

\- Reseller/partner self-service portal

\- Deep compliance automation

\- Voice seat/user management system

\- Contract generation engine

\- Advanced reporting dashboards





\## Day 2 Target



Create the first Supabase schema for:



\- accounts

\- account\_users

\- locations

\- quotes

\- orders

\- service\_instances

\- invoices

\- tickets

\- lifecycle\_events



\### Day 2 Success Criteria



By the end of Day 2:



\- Orbitlink can store a full customer lifecycle

\- You can manually create:

&#x20; - an account

&#x20; - a location

&#x20; - a quote

&#x20; - an order

&#x20; - a service

&#x20; - an invoice

&#x20; - a ticket

\- Data flows logically from Lead → Service → Billing → Support









