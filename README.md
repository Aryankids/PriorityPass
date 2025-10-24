# ✈️ Priority Pass & Taxi App Integration  
### *Seamless Airport Journey Architecture*

---

## 📑 Table of Contents
1. [🧭 Overview](#-overview)  
2. [💡 Key Value Propositions](#-key-value-propositions)  
3. [🎯 Scope](#-scope)  
4. [🧩 Assumptions](#-assumptions)  
5. [📦 Repository Contents](#-repository-contents)  
6. [🧠 C4 Architecture](#-c4-architecture)  
7. [🏗️ Architecture Overview](#️-architecture-overview)  
8. [👕 T-Shirt Sizing — Components](#-t-shirt-sizing--container-diagram-components)  
9. [🧮 Core Components Deep Dive](#-core-components-deep-dive)  
10. [🔐 PCI Compliance Strategy](#-pci-compliance-strategy)  
11. [🕒 Deferred Features (MVP Exclusions)](#-deferred-features-mvp-exclusions)  
12. [⚡ Technical Shortcuts & Mitigation](#️-technical-shortcuts--mitigation)  
13. [🚀 Scalability Plan](#-scalability-plan)  
14. [⚠️ Risk Assessment](#️-risk-assessment)  
15. [🤖 AI Tool Usage Reflection](#-ai-tool-usage-reflection)  
16. [📚 Best Practices Learned](#-best-practices-learned)

---

## 🧭 Overview
This solution integrates **Priority Pass lounge access** with a **global taxi service**, creating a seamless airport journey experience for travellers.  
The system enables **intelligent journey planning**, **cross-platform inventory sharing**, and provides a **unified user experience** across mobile and web.

---

## 💡 Key Value Propositions

**👤 For Travellers:**  
A single interface manages the full airport journey, from taxi booking to lounge access.  
The system continuously calculates *Estimated Departure Time (EDT)* and provides real-time notifications, such as:
- 🚕 *“Your taxi will arrive in 10 minutes.”*  
- 🛫 *“Traffic is heavier than usual — consider leaving 20 minutes earlier.”*  
- 🛋️ *“Your lounge access opens at 3:00 PM.”*  

**🎟️ For Priority Pass:**  
Increased user engagement via travel services and opportunities for targeted advertising partnerships.

**🚖 For Taxi Partners:**  
Access to a high-value traveller segment with predictable demand, plus visibility into lounge booking inventory.

---

## 🎯 Scope
The **MVP** integrates one taxi partner.  
Future phases aim to include:
- Multi-partner arbitration  
- ML-driven EDT prediction  
- Integrated advertising
- Integrated BoardingPass

---

## 🧩 Assumptions
- A **web application** will replicate the full functionality of the mobile experience.  
- **Continuous EDT calculation** and correction are required.  
- The **development team agrees** with the provided effort estimates (T-shirt sizing).  

---

## 📦 Repository Contents
- 🧱 C4 diagrams (Context, Container, Component)  
- ⚡ Lightweight **Next.js prototype snippets**  
- 📘 Architecture rationale, PCI notes, and trade-offs  

---

## 🧠 C4 Architecture

### 🗺️ Context Diagram
Shows interactions between:
- Passengers
- Taxi App API
- Priority Pass Platform
- Payment Gateway

### 🧰 Container Diagram
Depicts high-level relationships between:
- API Gateway  
- Core microservices  
- Databases and caches  

### 🔧 Component Diagram (Journey Planner)
Details:
- Flight data ingestion  
- Traffic API integration  
- ETA, ETD and buffer calculations  
- Caching tiers (in-memory, Redis)  

---

## 🏗️ Architecture Overview

### 🧩 High-Level Design Philosophy
The architecture follows five guiding principles:
1. **Microservices Architecture:** Services are loosely coupled, independently deployable, and focused on specific business capabilities
2. **Event-Driven Communication:** Asynchronous events enable real-time updates without tight coupling
3. **API-First Design:** All services expose REST APIs through a unified gateway
4. **Data Segregation:** PostgreSQL (transactional), Redis (cache), MongoDB (documents).  
5. **Platform Agnostic:** Services work for mobile, web, and partners.  


---

### 🧰 Technical Stack Rationale
#### ⚙️ Backend Services

Our backend architecture uses a polyglot design, selecting the most suitable language and framework for each domain to optimise scalability, reliability, and developer productivity.

- 🟩 **Node.js / Express** — *Inventory & Notification Services*  
  **Why:** Fast I/O performance, excellent for API orchestration, and supported by a large ecosystem.  
  **Trade-off:** Less type safety than Java/C# (mitigated with TypeScript).

- 🐍 **Python / FastAPI** — *Journey Planning Service*  
  **Why:** Superior data science libraries for calculations, async support, and rapid development.  
  **Trade-off:** Different runtime from Node services (acceptable for a specialised service).

- ☕ **Java / Spring Boot** — *Booking Management Service*  
  **Why:** Strong transactional guarantees, mature payment integration libraries, and enterprise-grade reliability.  
  **Trade-off:** Heavier resource footprint (justified for critical booking logic).

---

#### 🗄️ Data Stores

- 🐘 **PostgreSQL:** ACID compliance for bookings, proven reliability, and excellent geospatial support.  
- 📦 **NoSQL:** Flexible schemas, high scalability, high performance, and the ability to handle diverse data types.  
- ⚡ **Redis:** Sub-millisecond response times for ETAs and flight data, with pub/sub capabilities.  
- 🔄 **Kafka:** Scalable event streaming, replay capabilities, and exactly-once semantics.

---

#### 📱 Mobile

- ⚛️ **React Native:** Single codebase for iOS and Android, fast iteration cycles, and access to a large talent pool.

---

#### 🧩 Summary Table

| Category | Technology | Purpose / Why | Trade-off |
|-----------|-------------|----------------|-------------|
| 🟩 **Backend** | **Node.js / Express** | Fast I/O, great for APIs, large ecosystem | Less type safety (mitigated with TypeScript) |
| 🐍 **Backend** | **Python / FastAPI** | Data science support, async, fast development | Different runtime from Node services |
| ☕ **Backend** | **Java / Spring Boot** | Strong transactions, mature libraries, enterprise-grade | Heavier resource footprint |
| 🐘 **Data Store** | **PostgreSQL** | Reliable, ACID-compliant, geospatial support | Heavier setup and management overhead |
| 📦 **Data Store** | **NoSQL** | Flexible schema, high scalability, high performance | Eventual consistency in some cases |
| ⚡ **Data Store** | **Redis** | Ultra-fast cache and pub/sub messaging | In-memory cost for large datasets |
| 🔄 **Data Store** | **Kafka** | Stream processing, replayable, scalable | Operational complexity |
| ⚛️ **Mobile** | **React Native** | Cross-platform, fast iteration, large talent pool | Occasional platform-specific limitations |

---

## 🧱 T-Shirt Sizing, Container Diagram Components

### 💻 Client Applications

- 📱 **Priority Pass Mobile App Enhancement**  
  **Size:** L  
  **Rationale:** Existing app needs a new taxi booking flow, journey timeline UI, and cross-platform content display.  
  **Effort Includes:** UI/UX redesign, integration with new APIs, testing across iOS and Android, and app store submissions.  
  **Dependencies:** High coordination with existing Priority Pass features.  

---

### 🌐 API Gateway Layer

- 🔐 **API Gateway Configuration**  
  **Size:** S  
  **Rationale:** Standard AWS API Gateway setup with authentication and rate limiting.  
  **Effort Includes:** Route configuration and JWT validation.  
  **Dependencies:** Well-established patterns; configuration-heavy component.  

---

### ⚙️ Core Services

- 🧭 **Journey Planner Service**  
  **Size:** XL  
  **Rationale:** Most complex service, involving real-time calculations and multiple external API integrations.  
  **Effort Includes:** Flight tracking algorithms, ETA calculations with traffic, departure optimisation logic, and caching strategies.  
  **Dependencies:** High complexity in time-based calculations and edge case handling (delays, cancellations).  
  **Risk:** Performance-critical — directly impacts user experience.  

- 🔄 **Inventory Sharing Service**  
  **Size:** M  
  **Rationale:** Handles inventory sharing and availability checks across platforms.  
  **Effort Includes:** Data transformation, caching layer, and inventory versioning.  
  **Dependencies:** Moderate — requires understanding of both platforms’ inventory models.  

- 💳 **Booking Management Service**  
  **Size:** L  
  **Rationale:** Manages critical transactional workflows and PCI compliance requirements.  
  **Effort Includes:** Booking state machine, payment integration, refund logic, and audit logging.  
  **Dependencies:** High data integrity requirements and complex payment gateway integration.  

- 🛋️ **Lounge Management Service**  
  **Size:** M  
  **Rationale:** Provides centralised management of lounges to streamline operations, maintain consistency, and ensure data integrity across the system
  **Effort Includes:** Maintaining lounges, including deletion and archiving.  
  **Dependencies:** Moderate — requires understanding of the lounge data model.  

- 👥 **User Management Service**  
  **Size:** M  
  **Rationale:** Oversees user entity management across the platform, coordinating with authentication and consent services.  
  **Effort Includes:** Maintaining users, including deletion and consent removal.  
  **Dependencies:** Moderate — requires understanding of the user data model.  

- 📊 **System Monitoring Service**  
  **Size:** S  
  **Rationale:** Provides standard logging and monitoring capabilities.  
  **Effort Includes:** Configuring the service to maintain and segregate log levels and auditing data.  
  **Dependencies:** Can leverage existing solutions and frameworks.  

---

### 🗄️ Data Layer

- 🐘 **PostgreSQL Database Setup (Booking / Lounge)**  
  **Size:** M  
  **Rationale:** Schema design, migrations, and replication setup.  
  **Effort Includes:** ERD design, indexing strategy, and backup/recovery procedures.  
  **Dependencies:** Foundation for transactional data.  

- 📦 **NoSQL Database Setup (User)**  
  **Size:** M  
  **Rationale:** Schema design, migrations, and replication setup.  
  **Effort Includes:** Data modelling, schema validation, indexing and query optimisation, replication setup, and disaster recovery planning.
  **Dependencies:** Monitoring, language-specific driver, and replication if needed.  

- ⚡ **Redis Cache Setup (Availability Cache)**  
  **Size:** S  
  **Rationale:** Standard Redis deployment for caching.  
  **Effort Includes:** Configuration, clustering (if needed), and eviction policies.  
  **Dependencies:** Well-understood technology with minimal customisation.  

- 📨 **Kafka / RabbitMQ (Event Bus)**  
  **Size:** M  
  **Rationale:** Serves as the event-driven architecture backbone, requiring careful topic design.  
  **Effort Includes:** Topic configuration, consumer groups, dead letter queues, and monitoring.  
  **Dependencies:** Critical for asynchronous communication and requires operational expertise.  

---

### 🧮 Core Components Deep Dive

#### 🚀 Journey Planning Service
**Responsibilities:**  
- Calculate optimal taxi pickup times based on flight schedules.  
- Provide real-time ETAs with traffic considerations.  
- Track flight status and adjust recommendations dynamically.  
- Manage time buffer calculations (check-in, security, lounge time).  

**Why It’s the Most Complex:**  
- Integrates multiple external APIs (flight data, maps/traffic).  
- Real-time calculations under performance constraints (< 1s response).  
- Handles complex edge cases (flight delays, traffic spikes, gate changes).  
- Caching strategy must balance freshness and performance.  

**Key Algorithm**
```
Pickup Time = Flight Departure 
             - Security Buffer (90 min)
             - Lounge Time (45 min if booked)
             - Current Travel Time (Maps API)
             - Dynamic Traffic Buffer (15–30%)
             - Contingency (15 min)
```
---

### 🧩 Summary Table

| Category | Component | Size | Rationale | Key Dependencies |
|-----------|------------|------|------------|------------------|
| 💻 **Client App** | Priority Pass Mobile App Enhancement | L | New taxi booking flow, journey timeline UI, cross-platform content display | High coordination with existing PP features |
| 🌐 **API Gateway** | API Gateway Configuration | S | Standard AWS setup with auth/rate limiting | Well-established configuration patterns |
| ⚙️ **Core Service** | Journey Planner Service | XL | Real-time calculations, multi-API integration | High complexity, performance-critical |
| ⚙️ **Core Service** | Inventory Sharing Service | M | Inventory availability across platforms | Understanding of both inventory models |
| ⚙️ **Core Service** | Booking Management Service | L | Transactional workflows, PCI compliance | Payment gateway, data integrity |
| ⚙️ **Core Service** | Lounge Management Service | M | Manage lounges | Lounge data model |
| ⚙️ **Core Service** | User Management Service | M | Manage users and consent | User data model |
| ⚙️ **Core Service** | System Monitoring Service | S | Logging and auditing setup | Existing frameworks |
| 🗄️ **Data Layer** | PostgreSQL Setup (Booking/Lounge) | M | Schema, replication, backup | Transactional foundation |
| 🗄️ **Data Layer** | NoSQL Setup (User) | M | Schema, replication, indexing | Monitoring, driver setup |
| 🗄️ **Data Layer** | Redis Cache | S | Standard caching and eviction | Minimal customization |
| 🗄️ **Data Layer** | Kafka / RabbitMQ | M | Event bus and async comms | Operational expertise |

---

## 🔐 PCI Compliance Strategy

Payment Card Industry Data Security Standard (PCI DSS) compliance is achieved through tokenisation and scope reduction, ensuring no direct handling of sensitive payment data within our infrastructure.

---

### 🧩 Implementation Approach

#### 1️⃣ No Direct Card Data Handling
- Strategy: Never handle raw card data in our systems.  
- Implementation: Use a PCI-compliant payment gateway (e.g., Stripe) with hosted payment pages.  
- Flow:  
  1. The user enters payment information directly on the gateway-hosted form (not our UI).  
  2. The gateway returns a secure token.  
  3. The Booking Service stores only the token.  
  4. Charges are made using tokens, never raw card data.  

---

#### 2️⃣ Network Segmentation
- The Booking Management Service operates in an isolated network segment.  
- All payment-related API calls use a separate VPC with restricted access.  
- Only the Booking Service communicates with the payment gateway.  
- No other services possess payment gateway credentials.  

---

#### 3️⃣ Data Encryption
- At Rest: Encryption for all database records containing sensitive data.  
- In Transit: TLS 1.3 for all API communications.  
- Key Management: AWS KMS Vault handles automatic key rotation and secure storage.  

---

#### 4️⃣ Audit Logging
- Every payment-related action is logged with an immutable audit trail.  
- Logs include: user ID, timestamp, action, IP address, and result.  
- Logs are stored in a separate, security-focused data store (e.g., Splunk or CloudWatch).  
- Retention: Minimum of 1 year for PCI compliance.  

---

#### 5️⃣ Access Controls
- RBAC (Role-Based Access Control) enforces the principle of least privilege.  
- MFA (Multi-Factor Authentication) is required for all production access.  
- Regular access reviews and automated deprovisioning ensure continued compliance.  

---

#### 6️⃣ Reduced PCI Scope
By tokenising immediately and never storing card data, only the payment gateway (already PCI Level 1 certified) handles sensitive data.  
Our infrastructure is reduced to the SAQ-A scope, the simplest PCI self-assessment questionnaire, rather than a full PCI audit.

---

### 🛡️ Compliance Validation
- Annual third-party security audits  
- Quarterly vulnerability scans  
- Penetration testing before major releases  
- Regular staff security awareness training  

---

### 📋 Summary Table

| Category | Control Area | Key Measures | Tools / Frameworks | Impact |
|-----------|---------------|---------------|--------------------|---------|
| 🔐 Data Handling | No Direct Card Data | Tokenization via hosted gateway | Stripe (PCI L1) | Removes card data from scope |
| 🌐 Network Security | Network Segmentation | Isolated VPC for payment flows | AWS VPC | Limits access to payment services |
| 🔑 Encryption | Data at Rest / In Transit | TLS 1.3, AWS KMS rotation | AWS KMS, PostgreSQL | Ensures confidentiality |
| 🧾 Audit Logging | Immutable Audit Trail | Log every transaction action | Splunk / CloudWatch | Enables traceability |
| 👥 Access Control | RBAC + MFA | Least privilege, MFA enforced | IAM, SSO | Prevents unauthorized access |
| 🧩 Scope Reduction | Tokenization | Gateway handles sensitive data | Stripe / PCI DSS | Reduces compliance scope |
| 🧪 Validation | Continuous Compliance | Audits, scans, pentests, training | Third-party auditors | Maintains PCI DSS assurance |

---

## 🕒 Deferred Features (MVP Exclusions)

Certain features were intentionally deferred from the MVP (Minimum Viable Product) to prioritise delivery of the core integration and booking experience. These items are planned for future production phases.

---

### 🔐 1️⃣ Authentication & Authorization  
**Size:** M  
**Omitted:** Full OAuth 2.0 implementation, JWT token management, and refresh token rotation.  
**Why:** Focus on core integration logic for MVP.  

**Production Requirement:**  
- Implement OAuth 2.0 with Authorisation Code flow.  
- Add API key management for partner integrations.  
- Implement rate limiting per user or partner.  
**Estimated Effort:** 3–4 weeks.  

---

### 💱 2️⃣ Multi-Currency & Internationalization  
**Size:** L  
**Omitted:** Currency conversion, localised content, and regional pricing.  
**Why:** Initial launch assumed to be in a single market (UK).  

**Production Requirement:**  
- Develop a currency conversion service.  
- Integrate a localisation framework (i18n).  
- Add regional payment method support (Alipay, PayPal, etc.).  
**Estimated Effort:** 6–8 weeks.  

---

### 🤖 3️⃣ Advanced Analytics & Machine Learning  
**Size:** L  
**Omitted:**  
- Predictive ETA models (ML-based)  
- Demand forecasting  
- Dynamic pricing algorithms  
- Personalised recommendations  
**Why:** Start with rule-based algorithms and introduce ML enhancements later.  

**Production Requirement:**  
- Build an ML pipeline for traffic prediction.  
- Establish an A/B testing framework.  
- Create real-time model serving infrastructure.  
**Estimated Effort:** 3–4 months (with data science team).  

---

### 📶 4️⃣ Offline Mode Support  
**Size:** M  
**Omitted:** Local data caching and offline action queue.  
**Why:** Airport connectivity is expected to be reliable.  

**Production Requirement:**  
- Use IndexedDB or SQLite for local storage.  
- Implement background sync once connectivity is restored.  
- Add conflict resolution logic.  
**Estimated Effort:** 4–6 weeks.  

---

### 🧭 5️⃣ Comprehensive Monitoring  
**Size:** S  
**Omitted:** Full observability stack, distributed tracing, and alerting system.  
**Why:** MVP can start with basic logging and monitoring.  

**Production Requirement:**  
- Add distributed tracing (Zipkin).  
- Develop metrics dashboard (Grafana).  
- Integrate APM tool (DataDog or New Relic).  
- Define on-call rotation and runbooks.  
**Estimated Effort:** 2–3 weeks.  

---

### 🧩 Summary Table

| Category | Feature | Size | Omitted For MVP | Production Requirement | Estimated Effort |
|-----------|----------|------|------------------|------------------------|------------------|
| 🔐 Authentication | Authentication & Authorization | M | OAuth 2.0, JWT rotation | OAuth 2.0, API keys, rate limiting | 3–4 weeks |
| 💱 Internationalization | Multi-Currency & Localization | L | Currency, localized content, regional pricing | Conversion service, i18n, regional payment methods | 6–8 weeks |
| 🤖 Analytics & ML | Advanced Analytics & Machine Learning | L | Predictive ETAs, dynamic pricing, personalization | ML pipeline, A/B testing, real-time serving | 3–4 months |
| 📶 Offline | Offline Mode Support | M | Local caching, offline queue | IndexedDB/SQLite, background sync, conflict resolution | 4–6 weeks |
| 🧭 Monitoring | Comprehensive Monitoring | S | Full observability, alerting | Tracing, dashboards, APM, on-call runbooks | 2–3 weeks |



---

## ⚡ Technical Shortcuts & Mitigation

Several technical shortcuts were intentionally taken for the MVP to accelerate delivery and reduce complexity.  
Each shortcut has a defined mitigation path to transition toward production-grade robustness.

---

### 🔄 1️⃣ Synchronous Service Communication  
**Shortcut:** Initial implementation uses REST calls between services.  
**Risk:** Tight coupling, cascading failures, and latency accumulation.  

**Mitigation Path:**  
- Phase 1 (MVP): REST with circuit breakers and timeouts.  
- Phase 2 (6 months): Migrate critical paths to asynchronous events.  
- Phase 3 (12 months): Transition to a fully event-driven architecture.  

---

### 🌍 2️⃣ Single Region Deployment  
**Shortcut:** Deploy to a single AWS region initially.  
**Risk:** Regional outages could affect all users and cause higher latency for distant users.  

**Mitigation Path:**  
- Phase 1: Deploy to EU-West-1.  
- Phase 2: Add read replicas in other regions.  
- Phase 3: Implement multi-region active-active deployment with geo-routing.  

---

### 📈 3️⃣ Manual Scaling  
**Shortcut:** Start with manual capacity planning.  
**Risk:** Inability to handle sudden traffic spikes and inefficient resource utilisation.  

**Mitigation Path:**  
- Phase 1: Conservative over-provisioning.  
- Phase 2: Introduce horizontal pod autoscaling (HPA) in Kubernetes.  
- Phase 3: Implement predictive autoscaling based on historical usage patterns.  

---

### 🧪 4️⃣ Limited Test Coverage  
**Shortcut:** Focus primarily on critical path testing for MVP.  
**Risk:** Potential for bugs in edge cases and regression issues.  

**Mitigation Path:**  
- Phase 1: Achieve 70% code coverage on critical services.  
- Phase 2: Add integration and contract tests.  
- Phase 3: Implement full end-to-end (E2E) testing coverage.  

---

### 🧩 Summary Table

| Category | Shortcut | Risk | Mitigation Phases |
|-----------|-----------|------|-------------------|
| 🔄 Communication | Synchronous REST calls | Tight coupling, cascading failures | Phase 1: REST + timeouts → Phase 2: Async events → Phase 3: Event-driven |
| 🌍 Deployment | Single AWS region | Regional outage, latency issues | Phase 1: EU-West-1 → Phase 2: Read replicas → Phase 3: Multi-region |
| 📈 Scaling | Manual capacity planning | Traffic spikes, inefficiency | Phase 1: Over-provision → Phase 2: HPA → Phase 3: Predictive autoscaling |
| 🧪 Testing | Limited test coverage | Bugs, regressions | Phase 1: 70% critical → Phase 2: Integration → Phase 3: Full E2E |

---

## 🚀 Scalability Plan

## 📈 Scalability Considerations

This section outlines the scalability planning for the system, detailing the current MVP capacity and the future scale-out strategies across compute, caching, and database layers.

---

### ⚙️ Current MVP Capacity
- Users: 100,000 monthly active users  
- Concurrent Bookings: 500 simultaneous  
- API Throughput: 1,000 requests per second  
- Data Volume: Approximately 10 TB per year  

---

### 🧩 Scale-Out Strategy

#### 🧱 Horizontal Scaling
All services are designed as stateless containers, enabling elastic scaling based on demand:
- Scale Journey Planning Service: 3–10 pods based on CPU utilisation.  
- Scale Integration Service: 2–8 pods based on request queue depth.  
- Database: Use read replicas for query load and implement connection pooling.  

---

#### ⚡ Caching Strategy
A three-tier caching model ensures performance and reduced load on backend systems:
- L1 Cache: Application-level (in-memory, 1-minute TTL).  
- L2 Cache: Redis cluster (5-minute TTL).  
- L3 Cache: CDN for static content (24-hour TTL).  

---

#### 🗄️ Database Optimisation
Optimisations designed for high-throughput workloads and sustainable growth:
- Indexing Strategy: Index all foreign keys and frequently queried fields.  
- Partitioning: Bookings table partitioned by month for faster access.  
- Archival: Move bookings older than 6 months to cold storage.  

---

#### ⏱️ Performance Targets
Target metrics to maintain reliable performance under increasing loads:
- API Response Time: p95 < 500 ms, p99 < 1 s.  
- EDT Calculation: < 300 ms.  
- ETA Update Frequency: Every 60 seconds.  
- Booking Confirmation: < 2 seconds end-to-end.  

---

### 🧮 Summary Table

| Category | Area | Key Details | Objective |
|-----------|------|--------------|------------|
| ⚙️ MVP Capacity | System Load | 100 K MAU, 500 concurrent bookings, 1 K RPS, 10 TB/year | Baseline capacity for MVP |
| 🧱 Horizontal Scaling | Containers | Stateless services (3–10 pods / CPU, 2–8 pods/queue) | Enable elastic scaling |
| ⚡ Caching | Multi-Level Cache | L1 (1 min), L2 (5 min), L3 (24 h CDN) | Reduce backend load |
| 🗄️ Database | Optimization | Indexing, partitioning, archival > 6 months | Improve query efficiency |
| ⏱️ Performance | Targets | p95 < 500 ms, p99 < 1 s, ETA 60 s | Maintain high performance |



---

## ⚠️ Risk Assessment
## ⚠️ Risk Assessment

The following risks have been identified for both technical and business areas of the system. Each includes assessed probability, impact, and corresponding mitigation strategies.

---

### 🧠 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|--------------|---------|-------------|
| External API reliability (flights, maps) | Medium | High | Circuit breakers, fallback data, SLA monitoring |
| Payment gateway downtime | Low | Critical | Multiple payment providers, retry queue |
| Traffic miscalculation leading to missed flights | Medium | Critical | Conservative buffers, real-time adjustments, insurance partnership |
| Database performance degradation | Medium | High | Connection pooling, read replicas, query optimization |
| Third-party taxi API integration breaks | Medium | High | Abstraction layer, multiple taxi providers, health checks |

---

### 💼 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|--------------|---------|-------------|
| User adoption lower than expected | Medium | High | Incentives, marketing, seamless UX |
| Taxi provider partnership issues | Low | Critical | Multiple provider contracts, backup options |
| Regulatory compliance (taxi licensing) | Medium | Medium | Legal review by market, partner with licensed operators |

---

## 🤖 AI Tool Usage Reflection

This section reflects on how AI tools were integrated during development — highlighting what worked well, where human judgment was essential, and best practices learned throughout the process.

---

### 🧰 Tools Used
- ChatGPT / Claude: Architecture brainstorming, diagram syntax, documentation structure.  
- Builder.io: Code scaffolding for Next.js components.  

---

### 🚀 What Worked Well
- Rapid prototyping: Generated React UI in 30 minutes vs. 3+ hours of manual coding.  
- Documentation templates: Structured README format suggestions saved time.  
- Edge case identification: AI suggested scenarios that hadn’t been considered (e.g., flight cancellations, traffic anomalies).  

---

### 🧠 What Required Human Judgment
- Technology choices: AI suggested trendy but inappropriate technologies (e.g., GraphQL when REST was sufficient).  
- Business logic: Travel time buffer calculations required domain expertise.  
- Security decisions: PCI compliance strategy demanded regulatory understanding beyond AI capabilities.  
- Trade-off decisions: AI couldn’t weigh business priorities (e.g., speed to market vs. feature scope).  

---

### 💡 Best Practices Learned
1. Use AI for boilerplate tasks but apply human judgment for critical decisions.  
2. Validate AI-generated architecture against real-world constraints.  
3. Don’t accept AI suggestions blindly — pressure test assumptions.  
4. AI excels at structured outputs (diagrams, code) but struggles with nuanced trade-offs.  

---
