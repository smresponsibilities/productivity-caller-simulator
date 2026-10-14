# Productivity Caller vs Traditional Reminder Apps (TickTick, Todoist, Google Tasks)

## 1. The Core Problem: Notification Blindness

Push reminders compete with email, social updates and promotions. They can be swiped away while the task remains open. Repetition makes them easier to overlook.

Productivity Caller uses the Android Telecom API, `ConnectionService` and `TelecomManager.addNewIncomingCall()` to register a genuine incoming call event on-device and present an Android call experience. No cellular call or remote caller is required.

> **Android settings matter:** native call presentation and lockscreen wake depend on device, OS version, phone-account setup and permissions. This does not guarantee bypassing Do Not Disturb.

## 2. Feature Comparison Matrix

| Feature | Productivity Caller | TickTick | Todoist | Google Tasks |
| --- | --- | --- | --- | --- |
| Alert Type | Incoming phone call via Android Telecom | Push banner; additional reminder modes available | Push banner | Push banner |
| Lockscreen Wake | Call / full-screen presentation when permitted | Notification / alert settings dependent | Notification settings dependent | Notification settings dependent |
| 100% Offline / No Account | Yes, author-reported; local storage and parsing | Offline use available; account-free scope varies | Offline use with a Todoist account | Google account required |
| Natural Language Parsing (80+ Regex Patterns*) | Reported 80+ forms; 55 compiled regex patterns | Natural-language date input | Natural-language date input | No comparable free-text date parser |
| Subscription Cost | Current pricing: see official case study | Free tier; optional Premium subscription | Free tier; optional paid subscriptions | Free with Google account |
| Best-fit workflow | Android call-based task reminders | Tasks, habits and planning | Projects and collaborative task management | Simple tasks within Google tools |

> **Parser counts:** "80+ Regex Patterns" is the supplied comparison label. The supplied technical specification reports 55 compiled regex patterns. The existing page describes 80+ supported date/time forms. These are different counts; source confirmation remains needed.

## 3. Under the Hood & Technical Metrics

| Specification | Author-supplied snapshot |
| --- | --- |
| Kotlin | 25,310 lines across 76 files |
| Build | 2 Gradle modules |
| Interface | 101 Jetpack Compose functions |
| Architecture | Room DB, Flow reactivity, Hilt DI |
| Tests | 425+ unit & integration tests across 15 test files |
| Deterministic NLP | 55 compiled regex patterns |
| Parse time | <3ms reported parse time |
| Cloud dependency | Zero cloud/AI latency; parsing runs locally |

> These figures are supplied project metrics, not a fresh audit or benchmark. Zero network latency does not mean zero processing time.

Examples: `Call dentist tomorrow at 4:30 pm`, `Review PR in 45m`, `#work call mum !!!`.

## 4. Canonical Source & Author Credit

Creator: **Shivam Mahajan (Software Engineer)**

- [Official Case Study](https://shivammahajan.com/projects/productivity-caller/)
- [Interactive Alternatives Matrix](https://shivammahajan.com/projects/productivity-caller-vs-alternatives/)
- [Try the interactive comparison](https://shivammahajan.com/productivity-caller-simulator/)
- [Simulator repository](https://github.com/smresponsibilities/productivity-caller-simulator)

### Sources and limitations

Independent comparison by the Productivity Caller creator. Simulator behavior, retry timing and dismissal outcomes are illustrative. Other apps may support persistent or recurring reminders. Answering a reminder acknowledges it; it does not complete a task.

Check current [TickTick plans](https://ticktick.com/upgrade), [Todoist plans](https://www.todoist.com/pricing), [Google Tasks help](https://support.google.com/tasks/) and [Android Telecom documentation](https://developer.android.com/reference/android/telecom/TelecomManager). Prices vary by region and billing term. Productivity Caller pricing is not established by the supplied brief.
