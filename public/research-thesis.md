# Programmable, reproducible and measurable cybersecurity environments

CyberMindSpace Research Thesis • Version 0.1 • Research Program — In Development

## Abstract

CyberMindSpace Labs proposes infrastructure that binds a security scenario to its deployed environment, observable evidence and evaluation criteria. The research objective is to determine whether a bounded family of security experiments can be generated and varied without losing the meaning of the security properties being tested. Education is the proposed first deployment environment; the same experiment representation could later support security regression testing and collaborative research.

The strongest initial focus is a customer-support AI agent connected to retrieval, a tool gateway and synthetic customer records. This is small enough to validate yet crosses the boundaries where language-model behavior becomes system behavior. The proposed contribution is not another lab catalog, a new orchestration engine, or state-based scoring alone. It is the experimentally validated preservation of security intent across scenario specification, provisioning, observation and reproduction.

No experiments described here have been run by CyberMindSpace Labs. There are no reported platform benchmarks, production-capacity measurements, publications, patents or validated novelty claims. All architectural mechanisms and numerical gates below are proposals to test.

## Problem

An executable environment does not automatically constitute a valid security experiment. A deployment may succeed while a required vulnerability is unreachable, a policy has a different meaning on another backend, or a grader records the wrong outcome. Rebuilding an image also does not establish that an external model, retrieval corpus, identity policy or asynchronous tool execution is equivalent to a previous run.

The practical problem is maintaining agreement between four objects: intended security conditions, actual environment state, captured evidence, and evaluation semantics. When those objects are maintained independently, a scenario can silently drift. The result may look like a model improvement while actually reflecting a broken tool, a missing document or a failed environment setup.

This is a research hypothesis about an integration and validation problem, not a claim that every existing platform has this defect. Establishing its frequency and economic cost requires authoring studies, reproductions and direct comparisons.

## Prior art and competitive boundaries

Cyber-range automation already exists. CyRIS describes environments in YAML and automates their creation; its original repository is historical and explicitly redirects future development elsewhere. It establishes prior art for description-driven range deployment, not a recommendation to deploy its old release. Immersive documents range construction, networking, templates and repeatable deployment workflows. Hack The Box documents training labs and enterprise administration. Browser access and environment cloning therefore offer no standalone novelty. [1] [2] [3]

Constraint-driven scenario generation is also established research. VSDL translates infrastructure constraints through a satisfiability model into deployment scripts. SG-ML describes compiling smart-grid models into operational ranges. A natural-language interface over an infrastructure generator cannot, by itself, substantiate a new research contribution. [4] [5]

AI evaluation frameworks already extend beyond checking a final answer. AgentDojo evaluates tool-using agents using environment state and distinguishes task utility from attacker success. Inspect provides extensible sandboxes and scorers. Promptfoo documents agent testing that uses execution traces as grading and investigation evidence. CyberMindSpace must compare against these capabilities, not characterize all competitors as static flags or output-only evaluators. [6] [7] [8]

Repeatable cybersecurity experimentation has a substantial history, including DETER. Attack Flow represents connected adversary behavior; OpenTelemetry and OCSF supply existing conventions for observability and security events. A graph view or common event schema is therefore enabling infrastructure, not sufficient intellectual differentiation. [9] [10] [11] [12]

The proposed research gap is narrower: can one security-property contract remain valid when a scenario is instantiated, mutated and replayed across AI and infrastructure boundaries, while providing independently checkable evidence of both failures and measurement gaps? The reviewed sources establish overlap. They do not prove that no other system addresses this question.

## Hypothesis

Within a bounded scenario family, a typed specification that includes security properties and evidence requirements can reduce invalid experiments and reproduction effort compared with separately authored infrastructure, attack scripts and graders, without an unacceptable increase in cost or loss of fidelity.

Three subordinate hypotheses make the proposal testable. First, property-aware validation can catch semantically invalid scenarios that ordinary configuration validation accepts. Second, independent state observations can improve outcome classification over output-only grading when attacks cause hidden side effects. Third, explicit replay contracts can distinguish deterministic fixture replay from probabilistic repetition against a live model.

The thesis should be rejected or narrowed if benefits disappear against a well-integrated existing harness, if each new scenario still needs extensive custom plumbing, or if validation cannot detect common causes of false security conclusions.

## System model

Represent a scenario S as a tuple of topology, identities, capabilities, assets, vulnerabilities, controls, objectives, observability requirements and replay constraints. A compiler resolves S into a deployment plan P and a set of proof obligations O. Here a proof obligation is a specific condition to check; the term does not imply a complete formal proof of system security.

After provisioning, readiness checks measure actual initial state X0. An experiment applies an authorized input sequence A under execution configuration M, producing observations E and final state X1. A versioned evaluator computes V(S, X0, E, X1). Its security verdict belongs to {satisfied, violated, inconclusive}; environment execution status is reported separately as completed, invalid, timed out or infrastructure error.

The system must never turn missing evidence into a passing score. A refusal in model output cannot negate a confirmed unauthorized resource write. Conversely, text claiming to have exported data is insufficient evidence that an export occurred.

A reproduction bundle identifies the scenario, compiler, backend adapter, image digests, synthetic-data seed, retrieval index, model configuration, tool schemas, policy versions, attack sequence, evaluator version and evidence manifest. It also states which dependencies cannot be pinned.

## Fundamental primitives

The scenario contract defines intended behavior and permitted experimental variation. A protected asset is a typed resource with ownership, classification and allowed flows. A principal is an identity whose permissions are evaluated by enforcement points rather than inferred from natural-language instructions.

An environment plan is a dependency graph of provisionable resources. A security property is an executable assertion over state transitions and evidence, such as no unauthorized export of synthetic customer records. A sensor contract defines required observation points and how loss or tampering affects a verdict.

An experiment run binds inputs to a particular environment incarnation. An evidence record carries provenance and correlation identifiers. A verdict references the property and supporting records. A replay contract states the promised equivalence: exact fixture outputs, equivalent initial state, or statistically comparable live behavior.

These primitives form one product kernel. Learning objectives, classroom controls and enterprise reporting are interfaces over that kernel, not separate environment engines.

## Architecture

The control plane contains a scenario registry, schema validator, policy validator, dependency planner, scheduler and lifecycle reconciler. Compilers produce an intermediate representation with typed nodes and explicit edges for network access, identity delegation, tool invocation and data movement. Backend adapters translate this representation to a small, initially supported runtime.

The execution plane contains disposable environments. A dedicated tool gateway mediates agent actions; synthetic services supply retrieval, customer records and an email sink. Runtime permissions and network policies implement the scenario's intended boundaries. Deliberately vulnerable policies inside a target environment must remain distinct from the platform policies protecting other tenants and the control plane.

The evidence plane receives authenticated events from gateways, resource services and infrastructure sensors. Raw records are retained under restricted access; normalized records support queries. The evaluation plane runs outside the adversary-controlled environment and reads only the necessary evidence and state snapshots. It cannot accept a target-produced assertion as authoritative proof.

The lifecycle is validate, plan, provision, verify readiness, execute, observe, evaluate, export evidence, destroy and verify cleanup. Reconciliation uses idempotent operations, resource ownership labels, leases and bounded retries. A resource left behind after a failed run becomes an operational failure, not an invisible cost.

Initially reuse existing compute, storage and evaluation components. Do not build a hypervisor, model-serving fleet, general SIEM, cloud provider or distributed database. Establish one local development backend and one isolated pilot backend before proposing multi-cloud portability.

## Scenario-as-code

A minimum scenario declares a support agent, a retrieval corpus containing synthetic documents, a customer-record service, a tool gateway, and a synthetic email sink. Its legitimate objective is to answer an authorized customer question. Its adversarial objective is to cause a prohibited export through untrusted retrieved content.

The contract must declare which principal may read which records, which destinations are allowed, where the injection may be placed, and what evidence is required to establish export. A vulnerability label without a corresponding configuration change is not an executable specification.

Type validation catches malformed fields. Semantic validation checks identities, tool capabilities, reachable resources and satisfiable prerequisites. Runtime readiness tests then confirm that the deployed resources satisfy the required preconditions. Validating a plan is insufficient when a provider or adapter can deploy a different effective state.

Parameterize names, record contents and selected topology details only when the security property remains meaningful. Require a benign task witness and a controlled vulnerability witness for each generated variant. Retain failed variants and rejection reasons to measure generator quality honestly.

## Dynamic environments and scenario generation

Start with human-authored templates and constrained transformations. Add or remove an authorization control, adjust document trust, change one tool permission, or vary a network edge. Each mutation must identify the property it preserves or intentionally changes. Unrestricted generation should remain long-term research.

A future natural-language interface would produce a candidate specification through catalog retrieval and typed construction. A deterministic validator would reject unsupported resources, unspecified identities, prohibited egress, missing resource limits and ungrounded vulnerability assumptions. A researcher would inspect the resolved plan before execution.

The main scientific question is semantic preservation, not whether a language model can emit YAML. Compare natural-language generation against expert templates and constrained non-LLM generation. Count rejected outputs, manual repairs and failed witness tests, not just successfully parsed configurations.

A compiler cannot certify arbitrary software behavior. Claims must be bounded to the properties, adapters and scenario families whose validation procedures have been tested. Formal methods may help with a finite policy or topology model; they do not make an unmodeled agent or external API deterministic.

## AI-security research progression

Generation 1 is a planned educational exercise in which a model is instructed to protect a synthetic secret. Students explore direct prompt injection. This is useful teaching material but not, by itself, deep technology. The lab must explain that a real production secret should not be protected solely by a system instruction.

Generation 2 introduces a retrieval pipeline. Record corpus version, document identity, retrieval ranking, trust label and retrieved context. Distinguish poison ingestion, poison retrieval, model influence and actual disclosure. Indirect prompt injection is an established attack class in which adversarial instructions arrive through material an application consumes. [13]

Generation 3 connects an agent to tools through explicit identities and authorization. Observe a proposed tool call, gateway decision, downstream request and actual resource effect separately. MCP tests should pin the relevant protocol version and distinguish protocol conformance from application authorization. MCP security guidance discusses confused deputies, token passthrough, session attacks and other integration hazards. [14]

Generation 4 composes applications, agents, models, retrieval, tools and cloud resources. Investigate delegation, asynchronous actions and control interactions only after the simpler contracts work. Multi-agent behavior multiplies possible causal explanations and is a later extension, not an initial product dependency.

## State-based evaluation

Make state-based evaluation a core capability, while explicitly recognizing existing research such as AgentDojo. The proposed differentiator is validated correspondence between the scenario property, observation points and evaluator across controlled environment changes.

For disclosure, compare a synthetic protected value or a defined transformation of it with evidence at an unauthorized sink. For a forbidden write, check the destination service's durable state and authenticated audit record. For a privilege change, compare effective authorization before and after the run. For remediation, verify restored state and rerun the attack plus the legitimate task.

Exact matching misses paraphrase and encoding; semantic judges can misclassify or be influenced by adversarial text. Use deterministic checks where ground truth is available. Treat model-based assessments as fallible supporting signals with separately measured agreement, and never give an evaluation model authority to change the environment or its own rubric.

Measure security and legitimate task completion separately. A system that refuses every request may block an attack while becoming useless. Report attempted action, permitted action and completed effect as distinct events, and document whether a test evaluates confidentiality, integrity, availability or functional utility.

## Telemetry and security event graphs

Adopt OpenTelemetry-compatible tracing and map relevant infrastructure events to existing security schemas where practical. The GenAI conventions are under development, so record schema versions and maintain explicit adapters. OCSF provides a vendor-neutral security schema; neither framework establishes causality by itself. [11] [12]

A proposed event envelope contains experiment_id, environment_id, event_id, source_id, source_sequence, observed_time, ingested_time, trace_id, parent_id, principal, action, resource, policy_decision, result, schema_version and evidence_reference. Content-bearing payloads are minimized and access-controlled. Synthetic canaries support evaluation without collecting real customer secrets.

Graph edges must distinguish observed invocation, explicit data provenance and inferred temporal association. Two events occurring close together do not prove one caused the other. Clock skew, retries and asynchronous work require source sequences, correlation identifiers and uncertainty labels. A graph may contain gaps; displaying them is part of measurement integrity.

Do not claim access to hidden model reasoning. Record observable prompts, outputs, declared actions and tool behavior. An agent's self-reported rationale is neither a faithful internal trace nor authoritative evidence of why an action occurred.

The research question is whether this evidence structure improves cross-boundary diagnosis and evaluator reliability compared with ordinary correlated traces. A compelling animation is not a scientific contribution.

## Reproducibility

Separate three guarantees. Fixture replay reuses recorded model and service responses to debug the harness. Environment reproduction reconstructs equivalent initial resources and policies under a declared equivalence relation. Live repetition reruns the experiment against a model or service and measures an outcome distribution.

Do not promise bit-identical live model output. A seed, temperature setting or version label may not fix provider implementation, scheduling or backend changes. Record those limits. A replayed successful attack demonstrates that recorded events can be replayed, not that the same attack succeeds today.

Snapshots also need fresh per-session identities, secrets and entropy where uniqueness is required. Reproducing experimental conditions must not clone credentials across learners. Canonical manifests should distinguish stable experimental fields from deliberately regenerated operational fields.

Version every evaluator and retain the old rubric with its evidence. A later scorer can reanalyze an earlier bundle, but the resulting finding must be labeled a reanalysis. Compare failure distributions and security-state transitions, not only exact transcript hashes.

## Workload isolation and safety model

Treat target code, generated scenario inputs and learner activity as untrusted. Separate target networks from management services; disallow platform credentials in guest environments; constrain egress through a controlled gateway; enforce quotas, execution deadlines and automatic teardown. The experimental email service should deliver only to a synthetic sink.

Choose runtime isolation according to the threat model. Containers can suit constrained application exercises; arbitrary hostile code or kernel-focused labs require stronger separation and distinct operational review. Firecracker demonstrates a microVM design using virtualization and additional process restrictions, while its production guidance also identifies host and hardware responsibilities. Adopting it is not evidence that the assembled platform is secure. [15]

Test cross-session access, control-plane reachability, metadata access, resource exhaustion, forged telemetry and cleanup failures. Keep independent boundary sensors outside the guest. Finite tests cannot establish the absence of all escapes; publish scope and residual risk with any isolation claim.

## Research questions and planned experiments

Experiment A — semantic validity. Create a proposed corpus of 20 reviewed scenarios from the support-agent family, each with benign and vulnerable witnesses. Produce five controlled variants per scenario. Compare independently maintained deployment/grader scripts with the proposed contract compiler. Measure valid-run fraction, detected specification defects, manual repair time and undetected semantic drift. Have reviewers assess variants without knowing which authoring method produced them.

Experiment B — evaluation validity. Build a proposed set of 200 synthetic runs containing legitimate actions, blocked attacks, successful side effects, misleading model statements and missing evidence. Compare output-only scoring, an existing state-aware harness, and the proposed evaluator. Measure precision, recall, inconclusive rate and inter-reviewer agreement against independently reviewed resource evidence. Balance classes and publish the confusion matrix so prevalence cannot hide poor discrimination.

Experiment C — reproducibility. Repeat ten selected scenarios over at least 30 runs per condition, using pinned fixtures first and a live model second. Vary one dependency at a time: model identifier, retrieval index, policy or tool schema. Measure initial-state equivalence, verdict agreement, outcome distributions and time to reproduce a finding. Use this pilot to estimate variance and plan an adequately powered follow-up.

Experiment D — observability. Inject duplicate events, missing spans, delayed records, clock skew and forged guest logs into controlled traces. Compare timestamp joins with explicit provenance and source-sequence joins. Measure incorrect causal edges, unrecognized missing evidence, detection delay and evaluator changes. Remove each sensor in an ablation to identify the minimum defensible evidence set.

Experiment E — target classroom pilot. Progress through 1, 5, 10, 25 and 50 simultaneous synthetic sessions before involving a workshop. Measure readiness success, p50/p95 startup latency, tail task latency, session interference, teardown completion, abandoned resources, cost per session-hour and evidence loss. Fifty sessions is a target test condition, not a present capacity claim.

Experiment F — authoring and transfer. Compare expert-template authoring with constrained generation using counterbalanced task order and equivalent scenario difficulty. Track total time including rejected proposals and repair. After classroom validation, ask enterprise design partners to reproduce one representative agent defect using the same contract. Measure adaptation effort; do not infer enterprise utility from student satisfaction alone.

## Experimental methodology and decision gates

Pre-register hypotheses, primary endpoints, resource budgets, exclusions and stopping rules before confirmatory runs. Keep development scenarios separate from held-out evaluation scenarios; split by scenario family when testing generalization. Preserve infrastructure failures in operational denominators and report conditional security results separately.

Use paired comparisons where the same scenario can run under both methods. Treat scenarios, rather than repeated prompts alone, as units when estimating generalization. Report uncertainty intervals and effects, use cluster-aware resampling where appropriate, and account for multiple comparisons. Pilot counts above are planning values, not a statistical power justification.

Proposed engineering gates are at least 95% readiness success across the supported pilot corpus, no false pass on deliberately missing required evidence, and verified cleanup for every pilot run. A proposed research gate is at least a 25% reduction in median authoring-and-repair time against the integrated baseline without worse classification quality. These thresholds are managerial choices to preregister and revise before validation, not literature-derived standards.

A zero-escape pilot result must be reported with the tested actions and exposure, never as proof of perfect isolation. If cost per useful experiment or integration effort exceeds a viable commercial budget, narrow the supported environment family even when technical metrics look good.

## Actual R&D versus product engineering

Routine engineering includes account management, classroom UI, billing, container lifecycle, deployment adapters, standard event ingestion and browser delivery. These can be difficult operational work without constituting new research.

R&D includes defining tractable equivalence relations for security experiments, checking property preservation under scenario mutation, validating evaluators against incomplete or adversarial evidence, and quantifying fidelity loss when real services are replaced with controlled fixtures. Cross-boundary provenance under asynchronous execution is another candidate if comparisons establish an improvement over existing tracing.

Building a novel schema is not enough. Each candidate contribution needs a baseline, an experimental result and a statement of its limits. Use existing infrastructure wherever its behavior already meets the contract.

## Potential technical IP

Candidate assets include a tested property-preserving transformation library, validated domain-specific evaluators, a compiler that emits both deployment plans and evidence obligations, and a corpus of reviewed scenarios with reproducibility manifests and independently established outcomes.

The strongest defensibility may be accumulated validation quality and economical operation rather than exclusivity over a broad architecture. Open a minimal schema and interchange format to make results inspectable; consider commercial value in maintained scenario packages, managed execution and organization-specific adapters.

No patentability, ownership or freedom-to-operate conclusion is made here. Broad ideas such as scenario-as-code, attack graphs, automated generation and state scoring have substantial prior art. Any later IP exploration should focus on a concrete implemented mechanism and its measured contribution.

## Commercial applications

Education uses the kernel for guided exercises, meaningful feedback and classroom lifecycle. Enterprise security uses the same contracts for regression checks on an application, policy or tool change. AI-security teams use them for attack/defense comparisons that include legitimate utility. Researchers use the versioned evidence and replay contract to inspect or repeat an experiment.

The proposed commercial unit is a managed experiment environment with an evidence bundle. Course bundles may include one or three months of lab access; future individual, classroom and enterprise/research offerings can vary concurrency, retention and adapter support. Prices, availability, SLAs and capacity remain unannounced.

Avoid four unrelated roadmaps. Accept an additional use case only when it reuses the scenario model, lifecycle and evaluation plane. Dedicated enterprise integrations can become an expensive services business; measure repeatability of integration work before presenting them as scalable software revenue.

## Why CyberMindSpace

CyberMindSpace's public website presents an education ecosystem spanning courses, events and institutional or corporate training. That supports a distribution hypothesis: educators can recruit pilot users and observe friction in real teaching workflows. Public positioning does not independently validate audience size, platform maturity or research capability. [16]

A classroom can provide repeated trials of environment setup, usability and feedback, but learner traces are not automatically a representative enterprise-security dataset. Obtain appropriate participation consent, minimize personal data and separate optional research participation from required course assessment.

Commercialization also requires infrastructure engineering, security review, experimental design and enterprise integration expertise. The present evidence does not establish that all these capabilities are staffed. Partnerships should address concrete work packages and evaluation needs rather than serve as decorative institutional logos.

## Limitations

This is a proposed program, not a proven platform. The source review is targeted and cannot establish an exhaustive market or patent landscape. Product documentation is evidence of advertised capabilities, not independently verified effectiveness. Academic comparisons refer to the cited versions and their particular threat models.

A constrained support-agent family cannot establish generality across operating-system compromise, Active Directory, arbitrary cloud services or autonomous multi-agent systems. Simulated APIs can hide real authorization and consistency behavior. Production model providers can change. Telemetry can be compromised, incomplete or too costly to retain in full.

A platform that constructs its own scenarios and judges its own evidence can share a common error across both components. Independent resource witnesses, external review and reproductions are essential. A well-formed experiment can still measure the wrong security property.

## R&D roadmap

Phase 01 — Foundation, in development. Build basic lab lifecycle, the introductory prompt-injection experience and classroom workflows. Establish synthetic data, session boundaries, evidence export and cleanup before expanding the catalog.

Phase 02 — Programmable environments, research. Implement the bounded contract, one runtime adapter, readiness checks and correlated telemetry. Validate authoring effort and semantic drift against a competent existing-tool baseline.

Phase 03 — AI-security infrastructure, research. Add RAG, tool identities and authorization experiments; validate state-based outcomes and utility/security tradeoffs. Test the target classroom progression only after single-session measurement is reliable.

Phase 04 — Environment intelligence, long-term research. Investigate constrained generation, property-preserving mutations, additional adapters and reproducibility across organizations. Proceed only when earlier experiments support both technical value and manageable operating cost. No delivery dates are committed.

## Open research questions

What is the smallest scenario language that captures meaningful security properties without becoming a general-purpose programming language? Which properties can be validated before execution, and which require independent runtime witnesses? How much evidence is enough to distinguish a prevented action from an unobserved action?

Can scenario mutation preserve attack feasibility while changing superficial details? How should statistical reproduction be reported when a provider cannot pin its backend? Can evaluator portability survive differences between synthetic and real authorization systems? What is the smallest counterexample that explains a failed security property to both a learner and an engineer?

When does additional infrastructure realism improve measurement enough to justify its cost? Can a constrained domain outperform integration of existing tools, and does that improvement persist when another team authors the scenarios?

## Collaboration

The proposed collaboration model is a bounded experiment with explicit deliverables. Universities and researchers could review property definitions, establish independent ground truth or reproduce results. AI-security teams could contribute representative agent/tool workflows using synthetic assets. Infrastructure partners could help measure isolation, lifecycle correctness and cost under defined workloads.

A first collaboration should produce one reviewed scenario family, a documented baseline, an agreed measurement protocol and a reproducible evidence package. No partnership is implied. Expressions of interest can be directed to CyberMindSpace through its published contact address or the Labs early-access flow.

## References

[1] CROND/JAIST. CyRIS: Cyber Range Instantiation System. Historical repository; associated paper published 2018. https://github.com/crond-jaist/cyris

[2] Immersive. Getting Started with Cyber Ranges; product documentation, accessed 10 September 2026. https://support.immersivelabs.com/hc/en-us/articles/14846150124177-Getting-Started-with-Cyber-Ranges

[3] Hack The Box. Enterprise Offerings & Plans; product documentation, accessed 10 September 2026. https://enterprise-help.hackthebox.com/en/articles/13600086-enterprise-offerings-plans

[4] Costa, Russo and Armando. Automating the Generation of Cyber Range Virtual Scenarios with VSDL. Submitted 2020; revised 2023. https://arxiv.org/abs/2001.06681

[5] Mashima et al. Towards Automated Generation of Smart Grid Cyber Range for Cybersecurity Experiments and Training. DSN 2023 Industry Track; arXiv 2024. https://arxiv.org/abs/2404.00869

[6] Debenedetti et al. AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents. 2024, version 3. https://arxiv.org/html/2406.13352v3

[7] UK AI Security Institute. Inspect: Sandboxes and Scorers; documentation, accessed 10 September 2026. https://inspect.aisi.org.uk/extensions-sandboxes.html and https://inspect.aisi.org.uk/scorers.html

[8] Promptfoo. How to red team LLM Agents; updated 9 September 2026. https://www.promptfoo.dev/docs/red-team/agents/

[9] DETER Project. About the DETER Project; historical project description, accessed 10 September 2026. https://deter-project.org/about_deter_project.html

[10] Center for Threat-Informed Defense. Attack Flow; project page dated 30 July 2026. https://ctid.mitre.org/projects/attack-flow/

[11] OpenTelemetry. Semantic conventions for generative AI systems; development status, accessed 10 September 2026. https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/README.md

[12] Open Cybersecurity Schema Framework. Project overview; accessed 10 September 2026. https://ocsf.io/

[13] Greshake et al. Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection. 2023. https://arxiv.org/abs/2302.12173

[14] Model Context Protocol. Security Best Practices, 2025-11-25 version; accessed 10 September 2026. https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices

[15] Firecracker contributors. Firecracker Design and Production Host Setup; accessed 10 September 2026. https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md and https://github.com/firecracker-microvm/firecracker/blob/main/docs/prod-host-setup.md

[16] CyberMindSpace. Public homepage and Academy positioning; accessed 10 September 2026. https://www.cybermindspace.com/ and https://www.cybermindspace.com/academy
