import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styled, { keyframes, css } from "styled-components";
import StoreRegistration from "../../components/StoreRegistration/StoreRegistration";
import {
    LoadingContainer,
    LoadingIcon,
    LoadingText,
    LoadingStatus,
} from "./UserRoleSetting.styles";

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const WelcomeBlock = styled.div<{ hiding: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${({ hiding }) =>
    hiding
        ? css`
          ${fadeOut} 0.6s ease-out forwards
        `
        : "none"};
`;

const UserRoleSetting: React.FC = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [hideWelcome, setHideWelcome] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (role === "ROLE_OWNER") {
                setHideWelcome(true);
                setTimeout(() => setShowForm(true), 600);
            } else {
                navigate("/home");
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate, role]);

    return (
        <LoadingContainer>
            {!showForm && (
                <WelcomeBlock hiding={hideWelcome}>
                    <LoadingIcon>
                        <img src={logo} alt="Logo" />
                    </LoadingIcon>
                    <LoadingText>죽순의 회원이 되신 것을 환영합니다 : )</LoadingText>
                    <LoadingStatus>대나무가 될 회원님의 성장을 기대해요!</LoadingStatus>
                </WelcomeBlock>
            )}

            {showForm && <StoreRegistration onSuccess={() => navigate("/home")} />}
        </LoadingContainer>
    );
};

export default UserRoleSetting;