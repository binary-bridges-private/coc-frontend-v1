import { itr4Status, indianStates, itr4NatureOfEmployment } from "./utils.ts"

const ItrFour = () => {
    const onFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        console.table(formData);
        const prefix = "itr-4-";

        alert("ITR-4 Form submitted successfully!");
        setTimeout(() => window.location.href = "/practice/itr/login", 5000);
    }

    const pStyle = "mt-2 w-5/6 mx-auto text-gray-400 text-center text-sm";
    const sectionStyle = "border-[1px] shadow-md rounded-2xl px-6 py-16 grid grid-cols-2";
    const fieldsetStyle = "";
    const formPairStyle = "flex justify-center items-center gap-5";
    const inputStyle = "border-2 border-gray-300 rounded-lg px-2 py-1 w-1/2 bg-white text-gray-800 focus:outline-none focus:border-blue-500";
    const labelStyle = "text-black w-1/3";
    const noteStyle = "text-gray-400 text-sm w-3/4 mx-auto mt-2";
    const errorStyle = "text-red-500 text-sm my-2";

    return (
        <div className="min-h-screen bg-white">
            <h1 className="text-center text-gray-800 text-4xl pt-7 font-bold">ITR-4</h1>
            {/* <p className={pStyle}>For Individuals, HUFs and Firms (other than LLP) being a Resident having total income upto Rs.50 lakh and having income from business and profession which is computed under sections 44AD, 44ADA or 44AE, and having long-term capital gains under section 112A upto Rs. 1.25 lakh</p>
            <p className={pStyle}>Not for an individual who is either Director in a company or has invested in unlisted equity shares or if income-tax is deferred on ESOP or has agricultural income more than Rs.5000 or has assets (including financial interest in any entity) located outside India</p> */}
            <form onSubmit={onFormSubmit} className="py-8 px-16 mx-auto w-7/8 space-y-8 text-center">
                <section className={sectionStyle}>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-first-name" className={labelStyle}>First Name</label>
                            <input required type="text" name="itr-4-first-name" id="itr-4-first-name" className={inputStyle} />
                        </div>
                        <div id="itr-4-first-name-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-middle-name" className={labelStyle}>Middle Name</label>
                            <input type="text" name="itr-4-middle-name" id="itr-4-middle-name" className={inputStyle} />
                        </div>
                        <div id="itr-4-middle-name-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-last-name" className={labelStyle}>Last Name</label>
                            <input required type="text" name="itr-4-last-name" id="itr-4-last-name" className={inputStyle} />
                        </div>
                        <div id="itr-4-last-name-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-permanent-account-number" className={labelStyle}>Permanent Account Number</label>
                            <input required type="text" name="itr-4-permanent-account-number" id="itr-4-permanent-account-number" className={inputStyle} />
                        </div>
                        <div id="itr-4-permanent-account-number-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-flat-door-block-no" className={labelStyle}>Flat/Door/Block No.</label>
                            <input required type="text" name="itr-4-flat-door-block-no" id="itr-4-flat-door-block-no" className={inputStyle} />
                        </div>
                        <div id="itr-4-flat-door-block-no-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-premise-building-village" className={labelStyle}>Name of Premise/Building/Village</label>
                            <input required type="text" name="itr-4-premise-building-village" id="itr-4-premise-building-village" className={inputStyle} />
                        </div>
                        <div id="itr-4-premise-building-village-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-status" className={labelStyle}>Status</label>
                            <select name="itr-4-status" id="itr-4-status" className={inputStyle}>
                                {itr4Status.map(status => (
                                    <option value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div id="itr-4-status-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-road-street-postoffice" className={labelStyle}>Road/Street/Post Office</label>
                            <input required type="text" name="itr-4-road-street-postoffice" id="itr-4-road-street-postoffice" className={inputStyle} />
                        </div>
                        <div id="itr-4-road-street-postoffice-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-area-locality" className={labelStyle}>Area/Locality</label>
                            <input required type="text" name="itr-4-area-locality" id="itr-4-area-locality" className={inputStyle} />
                        </div>
                        <div id="itr-4-area-locality-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-date-of-birth" className={labelStyle}>Date of Birth</label>
                            <input required type="date" name="itr-4-date-of-birth" id="itr-4-date-of-birth" className={inputStyle + " accent-blue-500"} />
                        </div>
                        <div id="itr-4-date-of-birth-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-town-city-district" className={labelStyle}>Town/City/District</label>
                            <input required type="text" name="itr-4-town-city-district" id="itr-4-town-city-district" className={inputStyle} />
                        </div>
                        <div id="itr-4-town-city-district-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-state" className={labelStyle}>State</label>
                            <select name="itr-4-state" id="itr-4-state" className={inputStyle}>
                                {indianStates.map(state => (
                                    <option value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div id="itr-4-state-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-country-region" className={labelStyle}>Country/Region</label>
                            <input required type="text" name="itr-4-country-region" id="itr-4-country-region" className={inputStyle} />
                        </div>
                        <div id="itr-4-country-region-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-pin-code" className={labelStyle}>PIN Code/ZIP Code</label>
                            <input required type="number" name="itr-4-pin-code" id="itr-4-pin-code" className={inputStyle} />
                        </div>
                        <div id="itr-4-pin-code-error" className={errorStyle}></div>
                    </fieldset>
                </section>
                <section className={sectionStyle}>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-email-1" className={labelStyle}>Email 1</label>
                            <input required type="email" name="itr-4-email-1" id="itr-4-email-1" className={inputStyle} />
                        </div>
                        <div id="itr-4-email-1-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-email-2" className={labelStyle}>Email 2</label>
                            <input type="email" name="itr-4-email-2" id="itr-4-email-2" className={inputStyle} />
                        </div>
                        <div id="itr-4-email-2-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-residential-or-office-phone-number" className={labelStyle}>Residential/Office Phone Number with ISD Code</label>
                            <input required type="tel" name="itr-4-residential-or-office-phone-number" id="itr-4-residential-or-office-phone-number" className={inputStyle} />
                        </div>
                        <div id="itr-4-residential-or-office-phone-number-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-mobile-number-1" className={labelStyle}>Mobile Number 1</label>
                            <input required type="tel" name="itr-4-mobile-number-1" id="itr-4-mobile-number-1" className={inputStyle} />
                        </div>
                        <div id="itr-4-mobile-number-1-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-mobile-number-2" className={labelStyle}>Mobile Number 2</label>
                            <input type="tel" name="itr-4-mobile-number-2" id="itr-4-mobile-number-2" className={inputStyle} />
                        </div>
                        <div id="itr-4-mobile-number-2-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-aadhaar-number" className={labelStyle}>Aadhaar Number</label>
                            <input required type="number" name="itr-4-aadhaar-number" id="itr-4-aadhaar-number" className={inputStyle} />
                        </div>
                        <div className={noteStyle}>Note: Please enter the Aadhaar Number which is linked for your PAN in e-Filing portal. Applicable to Individual only</div>
                        <div id="itr-4-aadhaar-number-error" className={errorStyle}></div>
                    </fieldset>
                    <fieldset className={fieldsetStyle}>
                        <div className={formPairStyle}>
                            <label htmlFor="itr-4-nature-of-employment" className={labelStyle}>Nature of Employment</label>
                            <select name="itr-4-nature-of-employment" id="itr-4-nature-of-employment" className={inputStyle}>
                                {itr4NatureOfEmployment.map(nature => (
                                    <option value={nature}>{nature}</option>
                                ))}
                            </select>
                        </div>
                        <div id="itr-4-nature-of-employment-error" className={errorStyle}></div>
                    </fieldset>
                </section>
                <button type="submit" className="!mt-8 bg-blue-500 text-white text-lg rounded-full px-10 py-3 hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
}

export default ItrFour;