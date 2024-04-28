import { BsReddit, BsTelegram, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF, FaFacebookMessenger, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPinterestLogo } from "react-icons/pi";
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    EmailShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    RedditIcon,
} from "react-share";



const Share = () => {
    console.log("");
    return (
        <div className="flex items-center flex-wrap gap-4">
            <FacebookShareButton url={window?.location.href}>
                <FaFacebookF size={20} />
            </FacebookShareButton>
            <FacebookMessengerShareButton appId="" url={window?.location.href}>
                <FaFacebookMessenger size={20} />
            </FacebookMessengerShareButton>
            <TwitterShareButton url={window?.location.href}>
                <BsTwitterX size={20} />
            </TwitterShareButton>
            <LinkedinShareButton url={window?.location.href}>
                <FaLinkedinIn size={20} />
            </LinkedinShareButton>
            <RedditShareButton url={window?.location.href}>
                <BsReddit size={20} />
            </RedditShareButton>
            <TelegramShareButton url={window?.location.href}>
                <BsTelegram size={20} />
            </TelegramShareButton>
            <WhatsappShareButton url={window?.location.href}>
                <BsWhatsapp size={20} />
            </WhatsappShareButton>
            <PinterestShareButton media="" url={window?.location.href}>
                <PiPinterestLogo size={20} />
            </PinterestShareButton>
            <EmailShareButton url={window?.location.href}>
                <MdEmail size={20} />
            </EmailShareButton>
        </div>
    )
}

export default Share