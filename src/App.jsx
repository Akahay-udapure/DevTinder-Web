import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import Shipping from "./components/Shipping";
import RefundPolicy from "./components/RefundPolicy";
import ContactUs from "./components/ContactUs";
import Chat from "./components/Chat";

function App() {
    return (
        <>
            <Provider store={appStore}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" element={<Body />}>
                            <Route path="/" element={<Feed />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/connections"
                                element={<Connections />}
                            />
                            <Route path="/requests" element={<Requests />} />
                            <Route
                                path="/privacy-policy"
                                element={<PrivacyPolicy />}
                            />
                            <Route
                                path="/terms-and-conditions"
                                element={<TermsConditions />}
                            />
                            <Route
                                path="/shippinganddelivery"
                                element={<Shipping />}
                            />
                            <Route
                                path="/cancellation-refund-policy"
                                element={<RefundPolicy />}
                            />
                            <Route path="/contact-us" element={<ContactUs />} />
                            <Route
                                path="/chat/:targetUserId"
                                element={<Chat />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
